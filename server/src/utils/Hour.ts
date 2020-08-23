function addZero(number: number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

function getHour(): string {
    const now = new Date()
    const hour = addZero(now.getUTCHours() - 3)
    const mins = addZero(now.getUTCMinutes())

    return `${hour}:${mins}`
}

export default getHour
