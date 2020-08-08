import express from 'express'
import cors    from 'cors'
import routes from './routes'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",  "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "POST")
    app.use(cors())
    next()
})

app.use(routes) // routas

// const http      = require('http')
// const server = http.Server(app)

app.listen(3333)
