import express from 'express'
import cors from 'cors'
import http from 'http'

import routes from './routes'
import { IUser, addUser, getUsers, remUser } from './utils/User'
import getHour from './utils/Hour'

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 6102

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    if (!process.env) {
        res.header("Access-Control-Allow-Origin", "https://fagnerjb.com")
        res.header("Cross-Origin-Resource-Policy", "same-site")
    } else {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Cross-Origin-Resource-Policy", "*")
    }
    app.use(cors())
    next()
})

app.use(express.json())
app.use(routes)

interface ILogsItem {
    user: {
        name: string
        email?: string
    }
    deal: {
        id: string
        hand: {
            name: string
            desc: string
            rarity: number
        }
        swaps: number
        inHand: string[]
        suits?: string[]
        ranks?: string[]
        jokers?: number
    }
}

io.on('connection', (socket: any) => {

    socket.on('setRoom', (data: IUser) => {

        const { name, email, room } = data

        const user = addUser({
            id: socket.id,
            name,
            email,
            room
        })

        socket.join(user.room)
        socket.emit('setRoom', user.room)
        io.in(user.room).emit('setPlayers', getUsers(user.room!))

        socket.on('newPlay', (data: ILogsItem) => {

            Object.assign(data.deal, { time: getHour() })

            io.in(user.room).emit('newPlay', data)

        })

        socket.on('disconnect', () => {

            remUser(socket.id)
            socket.to(user.room).emit('setPlayers', getUsers(user.room!))

        })

    })


})

server.listen(port, () => {
    console.log(`PokerSync API running at ${port}`)
})
