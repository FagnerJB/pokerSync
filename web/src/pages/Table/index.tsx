import React, { useState, useEffect, useContext, FormEvent } from 'react'
import { useHistory } from "react-router-dom"

import Card from './components/Card'
import Options from './components/Options'
import Social from './components/Social'
import { cardClasses, cardImage } from './functions'

import api from '../../services/api';
import { renderName } from '../../localization'
import TableContext from '../../contexts/table';
import LogsContext from '../../contexts/logs'

import './style.css'

function Table() {

    const history = useHistory()

    const { hmCards, hmJokers, rmSuits, rmRanks, deck, lang, setOption } = useContext(TableContext)
    const { sendLog } = useContext(LogsContext)

    const [hand, setHand] = useState<string[]>([])
    const [swap, setSwap] = useState<string[]>([])
    const [swaps, setSwaps] = useState(0)
    const [handName, setHandName] = useState("")
    const [allowNew, setAllowNew] = useState(true)
    const [allowSwap, setAllowSwap] = useState(false)
    const [allowStop, setAllowStop] = useState(false)

    useEffect(() => {

        const localName = localStorage.getItem("pokerSync")

        if (!localName) {

            history.push('/')

        } else {

            const localDeck = localStorage.getItem("pokerSync_deck")
            const localLang = localStorage.getItem("pokerSync_lang")

            if (localDeck) setOption('deck', localDeck)
            if (localLang) setOption('lang', localLang)

        }

    }, [])

    function handleNewHand(e: FormEvent): void {

        e.preventDefault()

        if (52 + (hmJokers - ((rmSuits.length * 13) + (rmRanks.length * (4 - rmSuits.length)))) < hmCards) {
            alert(`Não é possível realizar uma nova jogada. O baralho não tem menos de ${hmCards} cartas.`)
            return
        }

        setSwap([])
        setHand([])
        setSwaps(0)

        api.post("/deal", {
            number: hmCards,
            jokers: hmJokers,
            suits: rmSuits.join(","),
            ranks: rmRanks.join(",")
        }).then(res => {

            localStorage.setItem('pokerSync_dealID', res.data.id)

            setHand(res.data.hand)
            setHandName(renderName(res.data.text, lang))

        })

    }

    function handleSwapHand(e: FormEvent): void {

        e.preventDefault()

        const id = localStorage.getItem('pokerSync_dealID')

        if (!id || swaps >= 3 || hand.length === 0 || swap.length === 0) {
            alert("Não é possível trocar.")
            return
        }

        setSwap([])
        setHand([])
        setHandName('Trocando...')

        api.post('/draw/' + id, {
            hand: hand.join(","),
            swap: swap.join(",")
        }).then(res => {

            localStorage.setItem('pokerSync_dealID', res.data.id)

            setSwaps(swaps + 1)
            setHand(res.data.hand)
            setHandName(renderName(res.data.text, lang))

        })

    }

    function handleStop(e: FormEvent) {

        e.preventDefault()

        const id = localStorage.getItem('pokerSync_dealID')
        const localName = localStorage.getItem("pokerSync")

        if (!id || !localName || hand.length === 0) return

        sendLog({
            user: JSON.parse(localName),
            name: handName,
            hand: hand,
            swap: swaps,
            jokers: hmJokers,
            suits: rmSuits,
            ranks: rmRanks
        })

    }

    return (
        <>
            <header className="hand-name">
                <h2>{handName || "Bem-vinde"}</h2>
            </header>
            <div className="table">
                {hand.length > 0 ? hand.map((face, i) => {

                    return (
                        <div key={"card-" + i} className={cardClasses(deck, swap.includes(face))}
                            onClick={() => swap.includes(face) ? setSwap(swap.filter((f) => f !== face)) : setSwap([...swap, face])}
                        >
                            <Card face={face} src={cardImage(deck, face)} back={cardImage(deck, "back")} />
                        </div>
                    )

                }) : Array.from(Array(hmCards).keys()).map((i) => <div key={"empty-" + i} className={"card empty " + deck}></div>)}
            </div>
            <div className="swapButtons">
                {hand.map((face, i) =>
                    <span key={"swap-" + i}>
                        <input id={"swap-" + i} type="checkbox" name="swaps" value={face}
                            checked={swap.includes(face)}
                            onChange={() => swap.includes(face) ? setSwap(swap.filter((f) => f !== face)) : setSwap([...swap, face])}
                        />
                        <label htmlFor={"swap-" + i}
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
            {hand.length > 0 && (
                <div className={"swapsCount level-" + swaps}>
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
            <Options />
            <Social />
        </>
    );
}

export default Table;
