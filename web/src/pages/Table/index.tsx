import React, { useState, useEffect, FormEvent } from 'react';

import Card from '../../components/Card'
import api from '../../services/api';
import handleName from '../../localization'

import './style.css'

const emoji = require('node-emoji')

function Table() {

    const initial = {
        jokers: 0,
        suits: [],
        ranks: []
    }

    const [jokers, setJokers] = useState(initial.jokers)
    const [suits, setSuits] = useState<string[]>(initial.suits)
    const [ranks, setRanks] = useState<string[]>(initial.ranks)

    const [lang, setLang] = useState("pt")
    const [deck, setDeck] = useState("mini")

    const [hand, setHand] = useState<string[]>([])
    const [swap, setSwap] = useState<string[]>([])
    const [handName, setHandName] = useState("")

    const suitList = [
        { key: "s", name: "Espadas " + emoji.get("spades") },
        { key: "d", name: "Ouros " + emoji.get("diamonds") },
        { key: "c", name: "Copas " + emoji.get("hearts") },
        { key: "h", name: "Paus " + emoji.get("clubs") }
    ]
    const rankList = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
    const deckList = [
        { key: "mini", name: "Simples" },
        { key: "full", name: "Pixel Plebes" },
        { key: "anim", name: "P.P. Animado" }
    ]
    const langList = [
        { key: "pt", title: "Português", name: emoji.get("flag-br") + emoji.get("flag-pt") },
        //{ key: "en", title: "Inglês", name: emoji.get("flag-us") + emoji.get("uk") }
    ]

    useEffect(() => {

        //["Qs", "5d", "Ts", "8c", "9h"].map((face) => {"face": face,"pressed": false})

    }, [hand])

    function handleNewHand(e: FormEvent): void {

        e.preventDefault()

        api.post("/deal", {
            number: 5,
            jokers: jokers,
            suits: suits.join(","),
            ranks: ranks.join(",")
        }).then(res => {

            localStorage.setItem('currentDealID', res.data.id)

            setHand(res.data.hand)
            setHandName(handleName(res.data.text, lang))

        })

    }

    function handleReset(e: FormEvent) {

        e.preventDefault()

        setRanks(initial.ranks)
        setJokers(initial.jokers)
        setSuits(initial.suits)

    }

    function handleClose() {

    }

    return (
        <>
            <header className="hand-name">
                <h2>{handName}</h2>
            </header>
            <div className="table">
                {hand.map((face, i) => <Card key={"card-" + i} face={face} deck={deck} selected={swap.includes(face)} />)}
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
                            <i className="fas fa-hand-point-down"></i> {swap.includes(face) ? 'Trocar' : 'Manter'}
                        </label>
                    </span>
                )}
            </div>
            <div className="gameButtons">
                {hand.length > 0 && <button name="swap">Confirmar troca</button>}
            </div>
            <div className="optionsPanel">
                <form onSubmit={handleNewHand}>
                    <button type="submit" className="startBtn">Nova jogada</button>
                    <div>
                        <h6>Número de Coringas</h6>
                        {[0, 1, 2, 3, 4].map((joker, i) =>
                            <span key={"jokers-" + i}>
                                <input id={"jokers-" + i} type="radio" name="jokers" value={joker}
                                    checked={joker === jokers}
                                    onChange={(e) => setJokers(Number(e.target.value))}
                                />
                                <label htmlFor={"jokers-" + i}
                                    tabIndex={9}
                                    role="button"
                                    aria-pressed={joker === jokers}
                                ><i className="far fa-circle"></i> {joker}</label>
                            </span>
                        )}
                    </div>
                    <div>
                        <h6>Remover Naipes</h6>
                        {suitList.map((suit, i) =>
                            <span key={"suit-" + i}>
                                <input id={"suit-" + i} type="checkbox" name="suits" value={suit.key}
                                    checked={suits.includes(suit.key)}
                                    onChange={() => suits.includes(suit.key) ? setSuits(suits.filter((s) => s !== suit.key)) : setSuits([...suits, suit.key])}
                                />
                                <label htmlFor={"suit-" + i}
                                    tabIndex={9}
                                    role="button"
                                    aria-pressed={suits.includes(suit.key)}
                                ><i className="fas fa-check"></i> {suit.name}</label>
                            </span>
                        )}
                    </div>
                    <div>
                        <h6>Remover Valores</h6>
                        {rankList.map((rank, i) =>
                            <span key={"rank-" + i}>
                                <input id={"rank-" + i} type="checkbox" name="ranks" value={rank}
                                    checked={ranks.includes(rank)}
                                    onChange={() => ranks.includes(rank) ? setRanks(ranks.filter((r) => r !== rank)) : setRanks([...ranks, rank])}
                                />
                                <label htmlFor={"rank-" + i}
                                    tabIndex={9}
                                    role="button"
                                    aria-pressed={ranks.includes(rank)}
                                ><i className="fas fa-check"></i> {rank === 'T' ? '10' : rank}</label>
                            </span>
                        )}
                    </div>
                    <button type="reset" onClick={handleReset}>Limpar</button>
                </form>
                <div>
                    <h6>Baralho usado</h6>
                    {deckList.map((deckItem, i) =>
                        <span key={"deck" + i}>
                            <input id={"deck" + i} type="radio" name="decks" value={deckItem.key}
                                checked={deckItem.key === deck}
                                onChange={(e) => setDeck(e.target.value)}
                            />
                            <label htmlFor={"deck" + i}
                                tabIndex={9}
                                role="button"
                                aria-pressed={deckItem.key === deck}
                            ><i className="far fa-circle"></i> {deckItem.name}</label>
                        </span>
                    )}
                </div>
                <div>
                    <h6>Idioma</h6>
                    {langList.map((langItem, i) =>
                        <span key={"lang-" + i}>
                            <input id={"lang-" + i} type="radio" name="lang" value={langItem.key} title={langItem.title}
                                checked={langItem.key === lang}
                                onChange={(e) => setLang(e.target.value)}
                            />
                            <label htmlFor={"lang-" + i}
                                tabIndex={9}
                                role="button"
                                aria-pressed={langItem.key === lang}
                            ><i className="far fa-circle"></i> {langItem.name}</label>
                        </span>
                    )}
                </div>
                <button type="button" className="closeBtn" onClick={handleClose}>Fechar</button>
            </div>
        </>
    );
}

export default Table;
