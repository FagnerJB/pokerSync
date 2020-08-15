import React, { useState, useEffect, useContext, FormEvent } from 'react'
import socketIO from 'socket.io-client'
import { useHistory } from "react-router-dom"

import Card from '../../components/Card'
import Options from './components/Options'
import Social from './components/Social'
import { cardClasses, cardImage } from '../../utils/cardFunctions'

import api from '../../services/api';
import { renderName } from '../../localization'
import TableContext from '../../contexts/table'

import { ILogsItem } from './interfaces'

import './style.css'

const io = socketIO('http://localhost:3333')

function Table() {

    const history = useHistory()

    const { hmCards, hmJokers, rmSuits, rmRanks, deck, lang, setOption } = useContext(TableContext)

    const [room, setRoom] = useState('')
    const [logs, setLogs] = useState<ILogsItem[]>([])

    const [hand, setHand] = useState<string[]>([])
    const [swap, setSwap] = useState<string[]>([])
    const [swaps, setSwaps] = useState(0)
    const [handName, setHandName] = useState("Bem-vinde")

    const [allowNew, setAllowNew] = useState(true)
    const [allowSwap, setAllowSwap] = useState(false)
    const [allowStop, setAllowStop] = useState(false)

    useEffect(() => {

        const localName = localStorage.getItem("pokerSync")

        if (!localName) {

            history.push('/')

        } else {

            const localUser = JSON.parse(localName)
            const localDeck = localStorage.getItem("pokerSync_deck")
            const localLang = localStorage.getItem("pokerSync_lang")

            if (localDeck) setOption('deck', localDeck)
            if (localLang) setOption('lang', localLang)

            io.emit('giveRoom', localUser.room)

            io.on('setRoom', (room: string) => {
                const newLocal = JSON.stringify({ ...localUser, room })
                localStorage.setItem("pokerSync", newLocal)
                setRoom(room)
            })

        }

        // eslint-disable-next-line
    }, [])


    useEffect(() => {

        io.on('sendPlay', (data: ILogsItem) => {
            setLogs([...logs, data])
        })

    }, [logs])

    useEffect(() => {

        if (swaps >= 3 || hand.length === 0 || swap.length === 0)
            setAllowSwap(false)
        else
            setAllowSwap(true)

    }, [swaps, hand, swap])

    useEffect(() => {

        if (52 + (hmJokers - ((rmSuits.length * 13) + (rmRanks.length * (4 - rmSuits.length)))) < hmCards)
            setAllowNew(false)
        else
            setAllowNew(true)

    }, [hmJokers, rmSuits, rmRanks, hmCards])


    function handleNewHand(e: FormEvent): void {

        e.preventDefault()

        setSwap([])
        setHand([])
        setSwaps(0)
        setHandName('Embaralhando...')
        setAllowNew(false)

        api.post("/deal", {
            number: hmCards,
            jokers: hmJokers,
            suits: rmSuits.join(","),
            ranks: rmRanks.join(",")
        }).then(res => {

            localStorage.setItem('pokerSync_dealID', res.data.id)

            setAllowStop(true)
            setHand(res.data.hand)
            setTimeout(() => {
                setHandName(renderName(res.data.text, lang))
            }, 900)

        })

    }

    function handleSelect(face: string): void {

        if (!allowStop) return

        if (swap.includes(face))
            setSwap(swap.filter((f) => f !== face))
        else
            setSwap([...swap, face])

    }

    function handleSwapHand(e: FormEvent): void {

        e.preventDefault()

        const id = localStorage.getItem('pokerSync_dealID')

        if (!id) return

        setSwap([])
        setHand([])
        setHandName('Trocando...')

        api.post(`/draw/${id}`, {
            hand: hand.join(","),
            swap: swap.join(",")
        }).then(res => {

            localStorage.setItem('pokerSync_dealID', res.data.id)

            setSwaps(swaps + 1)
            setHand(res.data.hand)
            setTimeout(() => {
                setHandName(renderName(res.data.text, lang))
            }, 900)

        })

    }

    function handleStop(e: FormEvent): void {

        e.preventDefault()

        const id = localStorage.getItem('pokerSync_dealID')
        const localName = localStorage.getItem("pokerSync")

        if (!id || !localName || hand.length === 0) return

        setAllowNew(true)
        setAllowStop(false)
        setSwap([])

        const localUser = JSON.parse(localName)

        const playObj = ({
            user: {
                name: localUser.name,
                email: localUser.email
            },
            id: id,
            name: handName,
            hand: hand,
            swap: swaps,
            jokers: hmJokers,
            suits: rmSuits,
            ranks: rmRanks
        })

        io.emit('newPlay', playObj)

    }

    return (
        <>
            <Options />
            <Social logs={logs} room={room} />
            <header className="hand-name">
                <h2>{handName}</h2>
            </header>
            <div className="table">
                {hand.length > 0 ? hand.map((face, i) => {

                    return (
                        <div key={`card-${i}`} className={cardClasses(deck, swap.includes(face))}
                            onClick={() => handleSelect(face)}
                        >
                            <Card face={face} src={cardImage(deck, face)} back={cardImage(deck, "back")} />
                        </div>
                    )

                }) : Array.from(Array(hmCards).keys()).map((i) => <div key={`empty-${i}`} className={`card empty ${deck}`}></div>)}
            </div>
            <div className="swapButtons">
                {hand.map((face, i) =>
                    <span key={`swap-${i}`}>
                        <input id={`swap-${i}`} type="checkbox" name="swaps" value={face}
                            checked={swap.includes(face)}
                            onChange={() => handleSelect(face)}
                        />
                        <label htmlFor={`swap-${i}`}
                            tabIndex={0}
                            role="button"
                            aria-pressed={swap.includes(face)}
                            className="button"
                        >
                            <i className="fas fa-hand-point-down"></i> {swap.includes(face) ? 'Troca' : 'Fica'}
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
            {(!allowNew || hand.length > 0) && (
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
