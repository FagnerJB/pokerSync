import React, { createContext, useReducer, useEffect, Dispatch } from 'react'

interface IGameStates {
    hmCards: number
    hmJokers: number
    rmSuits: string[]
    rmRanks: string[]
    deck: "mini" | "full" | "anim"
    lang: "en" | "pt" | "eo"
    toggle: "social" | "options" | "none"
}

interface IGameAction {
    type: "card" | "joker" | "suit" | "rank" | "lang" | "deck" | "toggle" | "reset"
    payload?: any
}

interface IGameFunctions {
    gameDispatch: Dispatch<IGameAction>
}

interface IGameContext extends IGameStates, IGameFunctions { }


const initialState = {
    hmCards: 5,
    hmJokers: 0,
    rmSuits: [],
    rmRanks: [],
    deck: "mini",
    lang: "pt",
    toggle: "none"
}

const GameContext = createContext<IGameContext>({} as IGameContext)

function gameReducer(state: IGameStates, action: IGameAction) {
    switch (action.type) {
        case 'card':
            return {
                ...state,
                hmCards: action.payload
            }
        case 'joker':
            return {
                ...state,
                hmJokers: action.payload
            }
        case 'suit':
            return {
                ...state,
                rmSuits: action.payload
            }
        case 'rank':
            return {
                ...state,
                rmRanks: action.payload
            }
        case 'lang':
            localStorage.setItem('pokerSync_lang', action.payload)
            return {
                ...state,
                lang: action.payload
            }
        case 'deck':
            localStorage.setItem('pokerSync_deck', action.payload)
            return {
                ...state,
                deck: action.payload
            }
        case 'toggle':
            return {
                ...state,
                toggle: action.payload
            }
        case 'reset':
            return {
                ...initialState,
                deck: state.deck,
                lang: state.lang,
                toggle: state.toggle
            } as IGameStates

        default:
            return state
    }
}



export const GameProvider: React.FC = ({ children }) => {

    const [gameState, gameDispatch] = useReducer(gameReducer, initialState as IGameStates)
    const { hmCards, hmJokers, rmSuits, rmRanks, deck, lang, toggle } = gameState

    useEffect(() => {

        const localDeck = localStorage.getItem("pokerSync_deck") as "mini" | "full" | "anim"
        const localLang = localStorage.getItem("pokerSync_lang") as "en" | "pt" | "eo"

        if (localDeck)
            gameDispatch({ type: 'deck', payload: localDeck })
        if (localLang)
            gameDispatch({ type: 'lang', payload: localLang })

    }, [])

    return (
        <GameContext.Provider value={{
            hmCards, hmJokers, rmSuits, rmRanks, deck, lang, toggle, gameDispatch
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContext
