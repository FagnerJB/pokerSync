const names = {
    "Five of a Kind": {
        "pt": "Quina",
        "eo": "Kvinopo",
    },
    "Royal Flush": {
        "pt": null,
        "eo": "Reĝa emblemo",
    },
    "Straight Flush": {
        "pt": null,
        "eo": "Sekvenco"
    },
    "Four of a Kind": {
        "pt": "Quadra",
        "eo": "Kvaropo"
    },
    "Full House": {
        "pt": null,
        "eo": "Plena domo"
    },
    "Flush": {
        "pt": null,
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
        "en": "Two",
        "pt": "Dois",
        "eo": "Du"
    },
    "3": {
        "en": "Three",
        "pt": "Três",
        "eo": "Tri",
    },
    "4": {
        "en": "Four",
        "pt": "Quatro",
        "eo": "Kvar",
    },
    "5": {
        "en": "Five",
        "pt": "Cinco",
        "eo": "Kvin"
    },
    "6": {
        "en": "Six",
        "pt": "Seis",
        "eo": "Ses"
    },
    "7": {
        "en": "Seven",
        "pt": "Sete",
        "eo": "Sep"
    },
    "8": {
        "en": "Eight",
        "pt": "Oito",
        "eo": "Ok"
    },
    "9": {
        "en": "Nine",
        "pt": "Nove",
        "eo": "Naŭ"
    },
    "10": {
        "en": "Ten",
        "pt": "Dez",
        "eo": "Dek"
    },
    "J": {
        "en": "Jack",
        "pt": "Valete",
        "eo": "Fanto"
    },
    "Q": {
        "en": "Queen",
        "pt": "Dama",
        "eo": "Damo"
    },
    "K": {
        "en": "King",
        "pt": "Rei",
        "eo": "Reĝo",
    },
    "A": {
        "en": "Ace",
        "pt": "Ás",
        "eo": "Aso",
    }
}

const suits = {
    "s": {
        "en": "Spades",
        "pt": "Espadas",
        "eo": "Piko"
    },
    "h": {
        "en": "Hearts",
        "pt": "Copas",
        "eo": "Kero"
    },
    "c": {
        "en": "Clubs",
        "pt": "Paus",
        "eo": "Trefo"
    },
    "d": {
        "en": "Diamonds",
        "pt": "Ouros",
        "eo": "Karoo"
    }
}

const words = {
    "is": {
        "pt": "é",
        "en": "is",
        "eo": "estas"
    },
    "and": {
        "pt": "e",
        "en": "and",
        "eo": "kaj"
    }
}


function fullCard(lang: "pt" | "eo" | "en", rank: string, suit: string = "") {

    let result = ""

    for (let item of Object.entries(ranks)) {

        if (rank.includes(item[0]) && item[1][lang])
            result += rank.replace(new RegExp(item[0], "g"), item[1][lang])

    }

    if (suit) {

        const of_lang = lang === "en" ? "of" : "de"

        for (let item of Object.entries(suits)) {

            if (suit.includes(item[0]) && item[1][lang]) {
                const suitName = suit.replace(new RegExp(item[0], "g"), item[1][lang])
                result += ` ${of_lang} ${suitName}`
            }

        }

    }

    return result
}


function fullName(text: { name: string, desc: string }, lang: "en" | "eo" | "pt") {

    let name = text.name
    let card = ''

    const of_lang = lang === "en" ? "of" : "de"
    const is_lang = words["is"][lang]
    const and_lang = words["and"][lang]

    if (lang !== "en") {

        for (let item of Object.entries(names)) {

            if (text.name.includes(item[0]) && item[1][lang]) {
                name = text.name.replace(item[0], item[1][lang]!)
                break
            }

        }

    }

    const withSuits = text.desc.matchAll(/(A|K|Q|J|10|9|8|7|6|5|4|3|2)(s|d|c|h)/g)
    card = Array.from(withSuits, (match) => {
        return fullCard(lang, match[1], match[2])
    }).join('')

    if (!card && 'High Card' !== text.name) {

        const onlyRanks = text.desc.matchAll(/(A|K|Q|J|10|9|8|7|6|5|4|3|2)('s| High)/g)
        card = Array.from(onlyRanks, (match) => {
            return fullCard(lang, match[1])
        }).join(` ${and_lang} `)

    }

    if (!card) {

        card = text.desc.replace(/'s|High|Flush/g, "").trim()
        return card === 'Royal' ? `${card} ${name}` : `${name} ${is_lang} ${fullCard(lang, card)}`

    }

    return `${name} ${of_lang} ${card}`

}

export default fullName
