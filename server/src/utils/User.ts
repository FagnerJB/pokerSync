const shuffle = require('shuffle-array')

interface IConnections {
    id: string,
    room: string
}

let users: IConnections[] = [];

function randomString(length: number) {

    const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
    let random = ""

    for (let i = 0; i < length; i++) {

        random += shuffle(characters)[1]

    }

    return random

}

export function addUser(socketID: string, room: string | null): IConnections {

    const roomID = room ? room : randomString(7)
    const user = { id: socketID, room: roomID }

    users.push(user)

    return user

}

export function remUser(id: string) {

    users = users.filter(user => user.id !== id)

}

export function getUser(id: string) {

    return users.find(user => user.id === id)

}
