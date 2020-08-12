const { FiveOfAKind, StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard } = require('pokersolver')

const standardWithJoker = {
    'cardsInHand': 5,
    'handValues': [FiveOfAKind, StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard],
    'wildValue': 'O',
    'wildStatus': 1,
    'wheelStatus': 0,
    'sfQualify': 5,
    'lowestQualified': null,
    "noKickers": false
}

export default standardWithJoker
