const shuffle = require('shuffle-array')

export interface IUser {
    name: string
    email: string | null
    room: string | null
}

type IConnections = IUser & {
    id: string
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

export function addUser(data: IConnections): IConnections {

    const { id, name, email, room } = data
    const roomID = room ? room : randomString(7)
    const user = {
        id,
        name,
        email,
        room: roomID
    }

    users.push(user)

    return user

}

export function remUser(id: string) {

    users = users.filter(user => user.id !== id)

}

export function getUsers(room: string) {

    return users.filter(user => user.room === room).map((item) => {
        return {
            email: item.email,
            name: item.name
        }
    })

}
