const names = {
    "Five of a Kind": {
        "pt": "Quina",
        "eo": "Kvinopo"
    },
    "Royal Flush": {
        "pt": "Sequência real",
        "eo": "Reĝa emblemo",
    },
    "Straight Flush": {
        "eo": "Sekvenco"
    },
    "Four of a Kind": {
        "pt": "Quadra",
        "eo": "Kvaropo"
    },
    "Full House": {
        "eo": "Plena domo"
    },
    "Flush": {
        "eo": "Emblemo"
    },
    "Straight": {
        "pt": "Sequência",
        "eo": "Sinsekvo"
    },
    "Three of a Kind": {
        "pt": "Trinca",
        "eo": "Triopo"
    },
    "Two Pair": {
        "pt": "Dois pares",
        "eo": "Du paroj"
    },
    "Pair": {
        "pt": "Par",
        "eo": "Paro"
    },
    "High Card": {
        "pt": "Maior carta",
        "eo": "Alta karto"
    }
}

const ranks = {
    "2": {
        "pt": "Dois",
        "eo": "Du"
    },
    "3": {
        "pt": "Três",
        "eo": "Tri",
    },
    "4": {
        "pt": "Quatro",
        "eo": "Kvar",
    },
    "5": {
        "pt": "Cinco",
        "eo": "Kvin"
    },
    "6": {
        "pt": "Seis",
        "eo": "Ses"
    },
    "7": {
        "pt": "Sete",
        "eo": "Sep"
    },
    "8": {
        "pt": "Oito",
        "eo": "Ok"
    },
    "9": {
        "pt": "Nove",
        "eo": "Naŭ"
    },
    "10": {
        "pt": "Dez",
        "eo": "Dek"
    },
    "J": {
        "pt": "Valete",
        "eo": "Fanto"
    },
    "Q": {
        "pt": "Dama",
        "eo": "Damo"
    },
    "K": {
        "pt": "Rei",
        "eo": "Reĝo",
    },
    "A": {
        "pt": "Ás",
        "eo": "Aso",
    }
}

const suits = {
    "s": {
        "pt": "Espadas",
        "eo": "Piko"
    },
    "h": {
        "pt": "Copas",
        "eo": "Kero"
    },
    "c": {
        "pt": "Paus",
        "eo": "Trefo"
    },
    "d": {
        "pt": "Ouros",
        "eo": "Karoo"
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
