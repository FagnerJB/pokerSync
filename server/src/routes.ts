import express from 'express'

const routes = express.Router()

import { getName, makeDeal, makeDraw } from './utils/Dealer'
import Deals from './database/models/Deals'

routes.get('/deal/:id', async (req, res) => {

    const { id } = req.params

    const getID = await Deals.findById(id)

    if (getID) {

        const name = getName(getID.hand);

        return res.json({
            hand: getID.hand,
            text: name
        });

    } else {

    }

})

routes.post('/deal', async (req, res) => {

    const { number, jokers, suits, ranks } = req.body

    const dealed = makeDeal(number, jokers, suits, ranks)

    const createID = await Deals.create({
        deck: dealed.deck,
        hand: dealed.hand
    })

    return res.json({
        id: createID._id,
        hand: dealed.hand,
        text: dealed.text
    })

})

routes.post('/draw/:id', async (req, res) => {

    const { id } = req.params
    const { hand, swap } = req.body

    const getID = await Deals.findById(id)

    if (!getID)
        return res.status(204)

    const drawed = makeDraw({
        deck: getID.deck,
        hand: getID.hand
    },
        hand.split(',').map((card: string) => card.trim()),
        swap.split(',').map((card: string) => card.trim())
    )

    if (drawed.deck.length === 0)
        return res.status(204)

    const createID = await Deals.create({
        deck: drawed.deck,
        hand: drawed.hand
    })

    return res.json({
        id: createID._id,
        hand: drawed.hand,
        text: drawed.text
    })

})

export default routes
