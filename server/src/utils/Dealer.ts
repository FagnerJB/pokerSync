const { Hand } = require('pokersolver')
const shuffle = require('shuffle-array')

import standardWithJoker from './Game'

const suits = ["s", "d", "h", "c"]
const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

function shuffleAndCut(deck: string[]) {
    const shuffled = shuffle(shuffle(shuffle(shuffle(deck))))
    const cutNumber = Math.floor(Math.random() * ((deck.length - 4) - 4 + 1) + 4)
    const sliceA = shuffled.slice(0, cutNumber)
    const sliceB = shuffled.slice(cutNumber)
    return sliceB.concat(sliceA)
}

interface PokerCard {
    value: string,
    suit: string,
    rank: number,
    wildValue: string
}

export function getName(hand: string[]) {

    const solved = Hand.solve(hand, standardWithJoker);

    return {
        name: solved.name,
        desc: solved.descr
    }

}


export function makeDeal(howMany: number, jokers: number, remSuits: string, remRanks: string) {

    let allCards = []

    const aSuits = remSuits ? remSuits.split(',').map(suit => suit.trim()) : []

    const aRanks = remRanks ? remRanks.split(',').map(rank => rank.trim()) : []

    suits.filter((suit) => !aSuits.includes(suit)).forEach((suit) => {

        ranks.filter((rank) => !aRanks.includes(rank)).forEach((rank) => {

            allCards.push(rank + suit)

        })

    })

    for (let j = 0; j < jokers; j++) {

        allCards.push(`O${suits[j]}`)

    }

    allCards = shuffleAndCut(allCards)

    const hand = allCards.slice(0, howMany)
    const solved = Hand.solve(hand, standardWithJoker)

    return {
        deck: allCards.slice(howMany),
        hand: solved.cards.map((card: PokerCard) => card.value + card.suit),
        text: {
            name: solved.name,
            desc: solved.descr
        }
    }

}

export function makeDraw(db: { hand: string[], deck: string[] }, hand: string[], swap: string[]) {

    if (db.hand.join(',') !== hand.join(','))
        return {
            deck: [],
            hand: []
        }

    const { deck } = db

    swap.forEach((card) => {

        const idx = hand.indexOf(card)
        hand.splice(idx, 1, deck[0])
        deck.shift()

    })

    const solved = Hand.solve(hand, standardWithJoker)

    return {
        deck: deck,
        hand: solved.cards.map((card: PokerCard) => card.value + card.suit),
        text: {
            name: solved.name,
            desc: solved.descr
        }
    }

}
