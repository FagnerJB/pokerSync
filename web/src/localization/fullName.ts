const names = {
    "Five of a Kind": {
        "pt": "Quina"
    },
    "Four of a Kind": {
        "pt": "Quadra"
    },
    "Three of a Kind": {
        "pt": "Trinca"
    },
    "Two Pair": {
        "pt": "Dois pares"
    },
    "Pair": {
        "pt": "Par"
    },
    "High Card": {
        "pt": "Maior carta"
    }
}

const ranks = {
    "2": {
        "pt": "Dois"
    },
    "3": {
        "pt": "Três"
    },
    "Q": {
        "pt": "Dama"
    },
    "4": {
        "pt": "Quatro"
    },
    "5": {
        "pt": "Cinco"
    },
    "6": {
        "pt": "Seis"
    },
    "7": {
        "pt": "Sete"
    },
    "8": {
        "pt": "Oito"
    },
    "9": {
        "pt": "Nove"
    },
    "10": {
        "pt": "Dez"
    },
    "J": {
        "pt": "Valete"
    },
    "K": {
        "pt": "Rei"
    },
    "A": {
        "pt": "Ás"
    }
}

const suits = {
    "s": {
        "pt": "Espadas"
    },
    "h": {
        "pt": "Copas"
    },
    "c": {
        "pt": "Paus"
    },
    "d": {
        "pt": "Ouros"
    }
}

function fullCard(rank: string, suit: string = "") {

    let result = ""

    for (let item of Object.entries(ranks)) {

        if (rank.includes(item[0]))
            result += rank.replace(new RegExp(item[0], "g"), item[1].pt)

    }

    if (suit) {

        for (let item of Object.entries(suits)) {

            if (suit.includes(item[0])) {
                const suitName = suit.replace(new RegExp(item[0], "g"), item[1].pt)
                result += ` de ${suitName}`
            }

        }

    }

    return result
}


function fullName(text: { name: string, desc: string }, lang: string) {

    let name = ''
    let card = ''

    for (let item of Object.entries(names)) {

        if (text.name.includes(item[0])) {
            name = text.name.replace(item[0], item[1].pt)
            break
        } else {
            name = text.name
        }

    }


    const withSuits = text.desc.matchAll(/(A|K|Q|J|10|9|8|7|6|5|4|3|2)(s|d|c|h)/g)
    card = Array.from(withSuits, (match) => {
        return fullCard(match[1], match[2])
    }).join('')


    if (!card && 'High Card' !== text.name) {

        const onlyRanks = text.desc.matchAll(/(A|K|Q|J|10|9|8|7|6|5|4|3|2)('s| High)/g)
        card = Array.from(onlyRanks, (match) => {
            return fullCard(match[1])
        }).join(' e ')

    }

    if (!card) {

        card = text.desc.replace(/'s|High|Flush/g, "").trim()
        return card === 'Royal' ? `${card} ${name}` : `${name} é ${fullCard(card)}`

    }

    return `${name} de ${card}`

}

export default fullName
