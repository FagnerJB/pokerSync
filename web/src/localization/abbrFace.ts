const emoji = require('node-emoji')

const suitList = [
    { key: "s", value: emoji.get("spades") },
    { key: "d", value: emoji.get("diamonds") },
    { key: "c", value: emoji.get("clubs") },
    { key: "h", value: emoji.get("hearts") }
]

function abbrFace(face: string): string {

    const card = face.match(/(A|K|Q|J|T|9|8|7|6|5|4|3|2|O)?(s|d|c|h)?/)
    if (card) {
        let rank = card[1] ? card[1] : null
        let suit = card[2] && rank !== "O" ? card[2] : null

        if (rank) {
            rank = rank.replace("T", "10").replace("O", "C" + emoji.get('black_joker'))
            if (!suit) return rank
        }

        if (suit) {
            suit = suitList.filter((item) => item.key === suit)[0].value
            if (!rank) return suit as string
        }

        if (rank && suit)
            return rank + suit
        else
            return ''

    } else
        return ''

}

export default abbrFace
