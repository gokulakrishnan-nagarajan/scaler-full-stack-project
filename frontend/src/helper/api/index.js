import { FETCH_PRODUCTS_URL } from "../../constants/endpoints";

export const fetchProducts = () => {
    return fetch(FETCH_PRODUCTS_URL)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error("Failed to fetch products");
        })
        .catch((err) => {
            console.error(err);

            throw err;
        });
};
