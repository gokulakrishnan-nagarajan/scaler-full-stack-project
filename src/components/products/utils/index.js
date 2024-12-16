export const resetInput = (name, setFn) => {
    const inputEles = document.querySelectorAll(`input[name="${name}"]`);

    inputEles.forEach((checkbox) => {
        checkbox.checked = false;
    });

    setFn({});
};

export const onCheckboxChange = (e, setFn) => {
    const value = e.target.checked;
    const key = e.target.getAttribute("data-value");

    setFn((prev) => {
        const newValue = { ...prev };

        if (value) {
            newValue[key] = true;
        } else {
            delete newValue[key];
        }

        return newValue;
    });
};

export const renderCheckbox = (name, value, onChange) => {
    return (
        <div key={value} className="flex-align-center">
            <input
                type="checkbox"
                name={name}
                data-value={value}
                onChange={onChange}
            />
            <label>{value}</label>
        </div>
    );
};

export const getFilterConfig = (
    resetCategoryFilter,
    renderCategoryFilter,
    resetBrandFilter,
    renderBrandFilter,
    resetPriceFilter,
    renderPriceFilter,
    resetRatingFilter,
    renderRatingFilter
) => [
    {
        label: "Category",
        onClick: resetCategoryFilter,
        render: renderCategoryFilter,
    },
    {
        label: "Brand",
        onClick: resetBrandFilter,
        render: renderBrandFilter,
    },
    {
        label: "Price",
        onClick: resetPriceFilter,
        render: renderPriceFilter,
    },
    {
        label: "Rating",
        onClick: resetRatingFilter,
        render: renderRatingFilter,
    },
];
