function addZero(number: number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

function getHour(): string {
    const now = new Date()
    const hour = now.getUTCHours() === 0 ? 24 : now.getUTCHours()
    const h = addZero(hour - 3)
    const m = addZero(now.getUTCMinutes())

    return `${h}:${m}`
}

export default getHour
