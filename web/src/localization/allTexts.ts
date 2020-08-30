const allTexts = {
    "Not found": {
        "pt": "Não encontrado",
        "eo": "Ne trovita"
    },
    "Loading...": {
        "pt": "Carregando...",
        "eo": "Ŝarĝante..."
    },
    "Back": {
        "pt": "Voltar",
        "eo": "Reiri"
    },
    "Loading image...": {
        "pt": "Carregando imagem...",
        "eo": "Ŝarĝante bildo..."
    },
    "Portuguese": {
        "pt": "Português",
        "eo": "Portugala"
    },
    "English": {
        "pt": "Inglês",
        "eo": "Angla"
    },
    "Esperanto": {
        "pt": "Esperanto",
        "eo": "Esperanto"
    },
    "Language": {
        "pt": "Idioma",
        "eo": "Idiomo"
    },
    "Dice rolling system for": {
        "pt": "Sistema de rolamento de dados para",
        "eo": "Ĵetkuboj rulaj sistemo por"
    }

}


export default function translate(text: string, lang: "eo" | "en" | "pt") {

    if (lang !== "en") {
        for (let item of Object.entries(allTexts)) {

            if (text.includes(item[0]) && item[1][lang])
                return text.replace(item[0], item[1][lang]!)

        }
    }
    return text

}
