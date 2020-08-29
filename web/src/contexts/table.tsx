import React, { createContext, useState } from 'react'

interface ITableContext {
    hmCards: number,
    hmJokers: number,
    rmSuits: string[],
    rmRanks: string[],
    deck: string,
    lang: "en" | "pt" | "eo",
    toggle: string,
    setOption(key: string, value: string | number | string[]): void,
    setInitial(): void
}

const TableContext = createContext<ITableContext>({} as ITableContext)

export const TableProvider: React.FC = ({ children }) => {

    const initial = {
        cards: 5,
        jokers: 0,
        suits: [],
        ranks: []
    }

    const [hmCards, setCards] = useState(initial.cards)
    const [hmJokers, setJokers] = useState(initial.jokers)
    const [rmSuits, setSuits] = useState<string[]>(initial.suits)
    const [rmRanks, setRanks] = useState<string[]>(initial.ranks)

    const [toggle, setToggle] = useState("none")

    const [lang, setLang] = useState<"en" | "pt" | "eo">("pt")
    const [deck, setDeck] = useState("mini")

    const setOption = (key: string, value: string | number | string[]): void => {
        switch (key) {
            case 'card':
                setCards(value as number)
                break;
            case 'joker':
                setJokers(value as number)
                break;
            case 'suit':
                setSuits(value as string[])
                break;
            case 'rank':
                setRanks(value as string[])
                break;
            case 'lang':
                setLang(value as "en" | "pt" | "eo")
                break;
            case 'deck':
                setDeck(value as string)
                break
            case 'toggle':
                setToggle(value as string)
                break
        }

    }

    function setInitial() {

        setRanks(initial.ranks)
        setJokers(initial.jokers)
        setSuits(initial.suits)

    }

    return (
        <TableContext.Provider value={{
            hmCards, hmJokers, rmSuits, rmRanks, deck, lang, toggle, setOption, setInitial
        }}>
            {children}
        </TableContext.Provider>
    )
}

export default TableContext
