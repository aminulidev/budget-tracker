
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
}