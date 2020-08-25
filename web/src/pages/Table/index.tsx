import React, { useState, useEffect, useContext, useReducer, FormEvent } from 'react'
import io from 'socket.io-client'
import { useHistory } from "react-router-dom"

import Card from '../../components/Card'
import Options from './components/Options'
import Social, { IUserState } from './components/Social'
import FullName from '../../components/FullName'

import { cardClasses, cardImage } from '../../utils/cardFunctions'
import TableContext from '../../contexts/table'
import { api, serverBaseURI, serverPathURI, ILogsItem } from '../../utils/services'
import { tableReducer } from './reducer'

import './style.css'

const socket = io(serverBaseURI, {
    path: serverPathURI + "/socket.io"
})

const initialState = {
    inHand: [],
    head: "Bem-vinde",
    hand: {
        name: null,
        desc: null,
        rarity: null
    },
    toSwap: [],
    swaps: 0,
    allowNew: true,
    allowSwap: false,
    allowStop: false
}

function Table() {

    const history = useHistory()

    const { hmCards, hmJokers, rmSuits, rmRanks, deck, setOption } = useContext(TableContext)

    const [state, dispatch] = useReducer(tableReducer, initialState)
    const { inHand, toSwap, head, hand, swaps, allowNew, allowSwap, allowStop } = state

    const [room, setRoom] = useState('')
    const [logs, setLogs] = useState<ILogsItem[]>([])
    const [players, setPlayers] = useState<IUserState[]>([])

    useEffect(() => {

        const localName = localStorage.getItem("pokerSync")

        if (!localName) {

            history.push(process.env.PUBLIC_URL)

        } else {

            const localUser = JSON.parse(localName)
            const localDeck = localStorage.getItem("pokerSync_deck")
            const localLang = localStorage.getItem("pokerSync_lang")

            if (localDeck) setOption('deck', localDeck)
            if (localLang) setOption('lang', localLang)

            socket.emit('setRoom', {
                name: localUser.name,
                email: localUser.email,
                room: localUser.room
            })

            socket.on('setRoom', (room: string) => {
                const newLocal = JSON.stringify({ ...localUser, room })
                localStorage.setItem("pokerSync", newLocal)
                setRoom(room)
            })

        }

        // eslint-disable-next-line
    }, [])


    useEffect(() => {

        const addLog = (log: ILogsItem) => setLogs([...logs, log])
        socket.on('newPlay', addLog)
        return () => {
            socket.off('newPlay', addLog)
        }

        // eslint-disable-next-line
    }, [logs.length])

    useEffect(() => {

        const addPlayer = (players: IUserState[]) => setPlayers(players)
        socket.on('setPlayers', addPlayer)
        return () => {
            socket.off('setPlayers', addPlayer)
        }

    }, [players.length])

    useEffect(() => {

        if (swaps >= 3 || inHand.length === 0 || toSwap.length === 0)
            dispatch({ type: "canSwap", payload: false })
        else
            dispatch({ type: "canSwap", payload: true })

        if (swaps === 3 && allowStop)
            handleStop()

        // eslint-disable-next-line
    }, [swaps, inHand, toSwap])

    useEffect(() => {

        if (52 + (hmJokers - ((rmSuits.length * 13) + (rmRanks.length * (4 - rmSuits.length)))) < hmCards)
            dispatch({ type: "canNew", payload: false })
        else if (!allowStop)
            dispatch({ type: "canNew", payload: true })

        // eslint-disable-next-line
    }, [hmJokers, rmSuits, rmRanks, hmCards])


    function handleSelect(face: string): void {

        if (!allowStop) return

        if (toSwap.includes(face))
            dispatch({ type: "requestSelect", payload: { swap: toSwap.filter((f: string) => f !== face) } })
        else
            dispatch({ type: "requestSelect", payload: { swap: [...toSwap, face] } })

    }


    function handleNewHand(e: FormEvent): void {

        e.preventDefault()

        dispatch({ type: "requestNew" })

        api.post("/deal", {
            number: hmCards,
            jokers: hmJokers,
            suits: rmSuits.join(","),
            ranks: rmRanks.join(",")
        }).then(res => {

            localStorage.setItem('pokerSync_dealID', res.data.id)

            setTimeout(() => {
                dispatch({
                    type: "receiveNew", payload: {
                        inHand: res.data.hand,
                        hand: res.data.text
                    }
                })
            }, 888)

        })

    }


    function handleSwapHand(e: FormEvent): void {

        e.preventDefault()
        if (!allowSwap) return

        const id = localStorage.getItem('pokerSync_dealID')

        if (!id) return

        dispatch({ type: "requestSwap" })

        api.post(`/draw/${id}`, {
            hand: inHand.join(","),
            swap: toSwap.join(",")
        }).then(res => {

            localStorage.setItem('pokerSync_dealID', res.data.id)

            setTimeout(() => {

                dispatch({
                    type: "receiveSwap", payload: {
                        swaps: swaps + 1,
                        inHand: res.data.hand,
                        hand: res.data.text
                    }
                })

            }, 888)

        })

    }

    function handleStop(e?: FormEvent): void {

        if (e) e.preventDefault()
        if (!allowStop) return

        const id = localStorage.getItem('pokerSync_dealID')
        const localName = localStorage.getItem("pokerSync")

        if (!id || !localName || inHand.length === 0) return

        dispatch({ type: "requestStop" })

        const localUser = JSON.parse(localName)

        const playObj = {
            user: {
                name: localUser.name,
                email: localUser.email
            },
            deal: {
                id: id,
                hand,
                swaps,
                inHand,
                jokers: hmJokers !== 0 ? hmJokers : undefined,
                suits: rmSuits.length !== 0 ? rmSuits : undefined,
                ranks: rmRanks.length !== 0 ? rmRanks : undefined
            }
        }

        socket.emit('newPlay', playObj)

    }

    return (
        <>
            <Options />
            <Social logs={logs} room={room} players={players} />
            <header className="hand-name">
                <h2>{head || <FullName hand={hand} />}</h2>
            </header>
            <div className="table">
                {inHand.length > 0 ? inHand.map((face: string, i: number) => {

                    return (
                        <div key={`card-${i}`} className={cardClasses(deck, toSwap.includes(face))}
                            onClick={() => handleSelect(face)}
                        >
                            <Card face={face} src={cardImage(deck, face)} back={cardImage(deck, "back")} />
                        </div>
                    )

                }) : Array.from(Array(hmCards).keys()).map((i) => <div key={`empty-${i}`} className={`card empty ${deck}`}></div>)}
            </div>
            <div className="swapButtons">
                {inHand.map((face: string, i: number) =>
                    <span key={`swap-${i}`}>
                        <input id={`swap-${i}`} type="checkbox" name="swaps" value={face}
                            checked={toSwap.includes(face)}
                            onChange={() => handleSelect(face)}
                        />
                        <label htmlFor={`swap-${i}`}
                            tabIndex={0}
                            role="button"
                            aria-pressed={toSwap.includes(face)}
                            className="button"
                        >
                            <i className="fas fa-hand-point-down"></i> {toSwap.includes(face) ? 'Troca' : 'Fica'}
                        </label>
                    </span>
                )}
            </div>
            <div className="gameButtons">
                <button type="button" aria-label="Nova jogada" onClick={handleNewHand} disabled={!allowNew}>
                    <i className="fas fa-play" /> Nova
                </button>
                <button type="button" aria-label="Trocar cartas" onClick={handleSwapHand} disabled={!allowSwap}>
                    <i className="fas fa-sync" /> Trocar
                </button>
                <button type="button" aria-label="Confirmar e enviar" onClick={handleStop} disabled={!allowStop}>
                    <i className="fas fa-stop" /> Parar
                </button>
            </div>
            {(!allowNew || inHand.length > 0) && (
                <div className={`swapsCount level-${swaps}`}>
                    Trocas
                    {Array.from(Array(3).keys()).map((i) => {
                        if (i >= swaps) {
                            return <i key={i} className="far fa-circle"></i>
                        } else {
                            return <i key={i} className="fas fa-circle"></i>
                        }
                    })}
                </div>
            )}
        </>
    );
}

export default Table;
