import { FETCH_PRODUCTS_URL } from "../../constants/endpoints";

export const callApi = (method, url) => {
    const fetchPromise = new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(this.responseText);
                } else {
                    reject(`Failed to call - ${method} ${url}`);
                }
            }
        };

        request.open(method, url);
        request.send();
    });

    return fetchPromise;
};

export const fetchProducts = () => {
    const fetchPromise = new Promise((resolve, reject) => {
        callApi("GET", FETCH_PRODUCTS_URL)
            .then((response) => {
                const responseJSON = JSON.parse(response);

                resolve(responseJSON);
            })
            .catch(() => {
                reject("Failed to fetch products");
            });
    });

    return fetchPromise;
};
