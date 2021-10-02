import express, { RequestHandler } from 'express'

const routes = express.Router()

const ObjectId = require('mongoose').Types.ObjectId

import { getName, makeDeal, makeDraw } from './utils/Dealer'
import Deals from './database/models/Deals'

const validateId: RequestHandler = (req, res, next) => {
   const { id } = req.params

   if (!ObjectId.isValid(id))
      return res.status(400).json({ "error": "Invalid ID" })

   next()
}

routes.get('/deal/:id', validateId, async (req, res) => {

   const { id } = req.params

   const getID = await Deals.findById(id)

   if (!getID)
      return res.status(404).json({ "error": "Not found" })

   const name = getName(getID.hand)

   return res.json({
      hand: getID.hand,
      text: name
   })

})

routes.post('/deal', async (req, res) => {

   const { number, jokers, suits, ranks } = req.body

   if (!number || !jokers || !suits || !ranks)
      return res.status(400).json({ "error": "Missing params" })

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

routes.post('/draw/:id', validateId, async (req, res) => {

   const { id } = req.params
   const { hand, swap } = req.body

   if (!hand || !swap)
      return res.status(400).json({ "error": "Missing params" })

   const getID = await Deals.findById(id)

   if (!getID)
      return res.status(204).json({ "error": "Not found" })

   const drawed = makeDraw({
      deck: getID.deck,
      hand: getID.hand
   },
      hand.split(',').map((card: string) => card.trim()),
      swap.split(',').map((card: string) => card.trim())
   )

   if (drawed.deck.length === 0)
      return res.status(204).json({ "error": "Deck runs out" })

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
