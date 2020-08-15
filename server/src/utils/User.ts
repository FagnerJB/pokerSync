const cryptoRandomString = require('crypto-random-string');

interface IConnections {
    id: string,
    room: string
}

const users: IConnections[] = [];

export function addUser(socketID: string, room: string | null): IConnections {

    const roomID = room ? room : cryptoRandomString({ length: 7 });
    const user = { id: socketID, room: roomID }

    users.push(user)

    return user

}

export function getUser(id: string) {

    return users.find(user => user.id === id)

}
