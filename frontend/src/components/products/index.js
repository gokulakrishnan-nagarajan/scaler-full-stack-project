import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import LoopIcon from "@mui/icons-material/Loop";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Tooltip from "@mui/material/Tooltip";

import { fetchProducts } from "../../store/products";
import Category from "../category";
import Loader from "../loader";
import { DEFAULT_MAX_RATING } from "../../constants/rating";
import { PRICE_FILTER_CONFIG } from "../../constants/filter";
import {
    getFilterConfig,
    onCheckboxChange,
    renderCheckbox,
    resetInput,
} from "./utils";

import styles from "./index.module.scss";

function Products() {
    const dispatch = useDispatch();

    const [showSearch, setShowSearch] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState({});
    const [brands, setBrands] = useState([]);
    const [brandFilter, setBrandFilter] = useState({});
    const [priceFilter, setPriceFilter] = useState({});
    const [ratingFilter, setRatingFilter] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);

    const { list: products, isLoading: isProductsLoading } = useSelector(
        (state) => state.products || {}
    );

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }
    }, []);

    useEffect(() => {
        const brandMap = {};
        const categoryMap = {};

        products.forEach(({ brand, category }) => {
            brandMap[brand] = true;
            categoryMap[category] = true;
        });

        const brandArr = Object.keys(brandMap).sort();

        setBrands(brandArr);

        const categoryArr = Object.keys(categoryMap).sort();

        setCategories(categoryArr);
    }, [products]);

    useEffect(() => {
        const searchTextLowerCase = searchText.trim().toLowerCase();
        let filteredProducts = products;

        if (searchTextLowerCase.length) {
            filteredProducts = products.filter(
                ({ title, brand }) =>
                    title.toLowerCase().includes(searchTextLowerCase) ||
                    brand.toLowerCase().includes(searchTextLowerCase)
            );
        }

        const categoriesToFilter = Object.keys(categoryFilter);

        if (categoriesToFilter.length) {
            filteredProducts = filteredProducts.filter(({ category }) =>
                categoriesToFilter.includes(category)
            );
        }

        const brandsToFilter = Object.keys(brandFilter);

        if (brandsToFilter.length) {
            filteredProducts = filteredProducts.filter(({ brand }) =>
                brandsToFilter.includes(brand)
            );
        }

        const { min = -Infinity, max = Infinity } = priceFilter;

        filteredProducts = filteredProducts.filter(
            ({ price: { discount, value } }) => {
                const currentPrice = value - discount;

                return min <= currentPrice && currentPrice <= max;
            }
        );

        const ratingsToFilter = Object.keys(ratingFilter).map((str) =>
            parseInt(str)
        );

        if (ratingsToFilter.length) {
            filteredProducts = filteredProducts.filter(
                ({ rating: { value: rating } }) =>
                    ratingsToFilter.includes(rating)
            );
        }

        setFilteredProducts(filteredProducts);
    }, [
        products,
        searchText,
        categoryFilter,
        brandFilter,
        priceFilter,
        ratingFilter,
    ]);

    const onSearchTextChange = (e) => {
        const newSearchText = e.target.value;

        setSearchText(newSearchText);
    };

    const resetSearch = () => {
        setSearchText("");
    };

    const resetCategoryFilter = useCallback(() => {
        resetInput("category", setCategoryFilter);
    }, []);

    const onCategoryChange = useCallback((e) => {
        onCheckboxChange(e, setCategoryFilter);
    }, []);

    const renderCategoryFilter = useCallback(() => {
        const categoryFilterRender = categories.map((category) =>
            renderCheckbox("category", category, onCategoryChange)
        );

        return categoryFilterRender;
    }, [categories, onCategoryChange]);

    const resetBrandFilter = useCallback(() => {
        resetInput("brand", setBrandFilter);
    }, []);

    const onBrandChange = useCallback((e) => {
        onCheckboxChange(e, setBrandFilter);
    }, []);

    const renderBrandFilter = useCallback(() => {
        const brandFilterRender = brands.map((brand) =>
            renderCheckbox("brand", brand, onBrandChange)
        );

        return brandFilterRender;
    }, [brands, onBrandChange]);

    const resetPriceFilter = useCallback(() => {
        resetInput("price", setPriceFilter);
    }, []);

    const onPriceChange = (e) => {
        const minPrice = e.target.getAttribute("data-price-min");
        const maxPrice = e.target.getAttribute("data-price-max");
        const minPriceInt = parseInt(minPrice);
        const maxPriceInt =
            maxPrice === "Infinity" ? Infinity : parseInt(maxPrice);

        setPriceFilter({ min: minPriceInt, max: maxPriceInt });
    };

    const renderPriceFilter = useCallback(() => {
        const priceFilterRender = PRICE_FILTER_CONFIG.map(
            ({ label, min, max }, index) => {
                const id = `price${index}`;

                return (
                    <div key={id} className="flex-align-center">
                        <input
                            id={id}
                            type="radio"
                            name="price"
                            data-price-min={min}
                            data-price-max={max}
                            onChange={onPriceChange}
                        />
                        <label htmlFor={id}>{label}</label>
                    </div>
                );
            }
        );

        return priceFilterRender;
    }, []);

    const resetRatingFilter = useCallback(() => {
        resetInput("rating", setRatingFilter);
    }, []);

    const onRatingChange = useCallback((e) => {
        onCheckboxChange(e, setRatingFilter);
    }, []);

    const renderRatingFilter = useCallback(() => {
        const ratingFilterRender = new Array(DEFAULT_MAX_RATING)
            .fill()
            .map((_, index) => {
                const rating = index + 1;

                return renderCheckbox("rating", rating, onRatingChange);
            });

        return ratingFilterRender;
    }, [onRatingChange]);

    const filterConfig = useMemo(
        () =>
            getFilterConfig(
                resetCategoryFilter,
                renderCategoryFilter,
                resetBrandFilter,
                renderBrandFilter,
                resetPriceFilter,
                renderPriceFilter,
                resetRatingFilter,
                renderRatingFilter
            ),
        [
            resetCategoryFilter,
            renderCategoryFilter,
            resetBrandFilter,
            renderBrandFilter,
            resetPriceFilter,
            renderPriceFilter,
            resetRatingFilter,
            renderRatingFilter,
        ]
    );

    const renderFilters = () => {
        const filtersRender = filterConfig.map(({ label, onClick, render }) => {
            return (
                <div key={label}>
                    <div className={styles["filter-title-container"]}>
                        <span className={styles["filter-title"]}>{label}</span>
                        <Tooltip title="Reset">
                            <LoopIcon
                                className={styles["reset-btn"]}
                                fontSize="32"
                                onClick={onClick}
                            />
                        </Tooltip>
                    </div>
                    <div className={styles["filter-options-container"]}>
                        {render()}
                    </div>
                </div>
            );
        });

        return filtersRender;
    };

    const renderCategorizedProducts = () => {
        const categoriesMap = {};

        filteredProducts.forEach((product) => {
            if (!categoriesMap[product.category]) {
                categoriesMap[product.category] = [];
            }

            categoriesMap[product.category].push(product);
        });

        const categoryArr = Object.keys(categoriesMap);

        return categoryArr.map((category) => (
            <Category
                key={category}
                category={category}
                products={categoriesMap[category]}
            />
        ));
    };

    if (isProductsLoading) {
        return <Loader />;
    }

    return (
        <div className={styles["container"]}>
            <div
                className={`${styles["search-filter-container"]} ${
                    !showSearch ? styles["collapse"] : ""
                }`}
            >
                <div className={styles["search-filter-toggle"]}>
                    <button
                        className={styles["search-filter-toggle-btn"]}
                        onClick={() => setShowSearch(!showSearch)}
                    >
                        {showSearch ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </button>
                </div>
                {showSearch && (
                    <>
                        <div className={styles["search-container"]}>
                            <input
                                placeholder="Search"
                                value={searchText}
                                onChange={onSearchTextChange}
                            />
                            <ClearIcon
                                className={styles["clear-btn"]}
                                fontSize="32"
                                onClick={resetSearch}
                            />
                        </div>
                        {renderFilters()}
                    </>
                )}
            </div>
            <div className={styles["products-container"]}>
                <div className={styles["product-count"]}>
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""}
                </div>
                <div>{renderCategorizedProducts()}</div>
            </div>
        </div>
    );
}

export default Products;
