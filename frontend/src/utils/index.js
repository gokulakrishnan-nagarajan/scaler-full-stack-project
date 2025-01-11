import {
    CURRENCY_MAP,
    CURRENY_PUNCTUATION_MAP,
    DEFAULT_CURRENCY,
} from "../constants/currency";

export const formatAmount = (amount, currency) => {
    const validCurrency = currency ?? DEFAULT_CURRENCY;

    return (
        CURRENCY_MAP[validCurrency] +
        " " +
        amount.toLocaleString(CURRENY_PUNCTUATION_MAP[validCurrency])
    );
};

export const formatDateTime = (dateTimeStr) => {
    const dateTimeObj = new Date(dateTimeStr);
    const localeDateTimeStr = dateTimeObj.toLocaleString();
    const [date, time] = localeDateTimeStr.split(",").map((str) => str.trim());
    const [hours, minutes] = time.split(":");
    const timeTrimmed =
        (hours % 12 || 12) + ":" + minutes + " " + (hours > 11 ? "PM" : "AM");
    const formattedDateTimeStr = date + " " + timeTrimmed;

    return formattedDateTimeStr;
};
