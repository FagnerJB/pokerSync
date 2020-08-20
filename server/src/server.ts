import express from 'express'
import cors from 'cors'
import http from 'http'

import routes from './routes'
import { addUser, remUser } from './utils/User'

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
        name: string
        hand: string[]
        swap: number
        suits?: string[]
        ranks?: string[]
        jokers?: number
    }
}

io.on('connection', (socket: any) => {

    socket.on('setRoom', (room: string) => {

        const user = addUser(socket.id, room)

        socket.join(user.room)
        socket.emit('setRoom', user.room)

        socket.on('newPlay', (data: ILogsItem) => {

            const now = new Date()
            const now_hour = (now.getUTCHours() - 3) + ":" + now.getUTCMinutes()

            Object.assign(data.deal, { time: now_hour })

            io.in(user.room).emit('newPlay', data)

        })

    })

    socket.on('disconnect', () => {

        remUser(socket.id)

    })

})

server.listen(port, () => {
    console.log(`PokerSync API running at ${port}`)
})
