import {Currencies} from "@/lib/currencies";

export const DateToUTCDate = (date: Date) => {
    return new Date(
        Date.UTC(
            date.getUTCFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMilliseconds()
        )
    )
};

export const GetFormatterForCurrency = (currency: string) => {
    const locale = Currencies.find((c) => c.value === currency)?.locale;

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency
    })
}
