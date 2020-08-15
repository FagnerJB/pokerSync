import express from 'express'
import cors from 'cors'
import http from 'http'

import routes from './routes'
import { getUser, addUser } from './utils/User'

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "*")
    app.use(cors())
    next()
})

app.use(express.json())
app.use(routes)

interface ILogsItem {
    user: {
        name: string,
        email?: string
    },
    id: string,
    name: string,
    hand: string[],
    swap: number,
    jokers: number,
    suits: string[],
    ranks: string[]
}

io.on('connection', (socket: any) => {

    socket.on('giveRoom', (room: string) => {

        const user = addUser(socket.id, room)

        socket.join(user.room)
        socket.emit('setRoom', user.room)

        socket.on('newPlay', (data: ILogsItem) => {

            io.in(user.room).emit('sendPlay', data)

        })

    })

})

server.listen(3333)
