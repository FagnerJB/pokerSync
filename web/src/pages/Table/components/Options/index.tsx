import React, { useContext, FormEvent, useState, useEffect } from 'react'

import TableContext from '../../../../contexts/game'
import LangSelector from '../../../../components/LangSelector'

import './style.css'

const emoji = require('node-emoji')

function Options() {

    const { hmCards, hmJokers, rmSuits, rmRanks, deck, toggle, gameDispatch } = useContext(TableContext)

    const [badge, setBadge] = useState(0)
    const suitList = [
        { key: "h", name: `Copas ${emoji.get("hearts")}` },
        { key: "s", name: `Espadas ${emoji.get("spades")}` },
        { key: "d", name: `Ouros ${emoji.get("diamonds")}` },
        { key: "c", name: `Paus ${emoji.get("clubs")}` }
    ]
    const rankList = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
    const deckList = [
        { key: "mini", name: "Simples" },
        { key: "full", name: "Pixel" },
        { key: "anim", name: "Pixel Animado" }
    ]

    useEffect(() => {

        const number = rmSuits.length + rmRanks.length + (hmJokers > 0 ? 1 : 0)
        setBadge(number)

    }, [hmJokers, rmSuits, rmRanks])

    function handleReset(e: FormEvent) {
        e.preventDefault()
        gameDispatch({ type: "reset" })
    }

    return (
        <div className={"optionsPanel" + (toggle === "options" ? " opened" : "")}>
            <header>
                <button type="button" className="closeBtn" data-badge={badge}
                    onClick={() => gameDispatch({ type: "toggle", payload: toggle === "options" ? "none" : "options" })}
                ><i className="fas fa-bars"></i></button>
                <h4>Configurações</h4>
                <p><a href="https://fagnerjb.com/logs/europair" target="_blank" rel="noopener noreferrer">Como usar</a> <i className="fas fa-external-link-alt"></i></p>
                <button className="resetBtn" type="reset" onClick={handleReset}>Limpar</button>
            </header>
            <form>
                <div>
                    <h6>Número de cartas</h6>
                    {[5, 4, 3, 2, 1].map((idx) =>
                        <span key={`numbers-${idx}`}>
                            <input id={`numbers-${idx}`} type="radio" name="numbers" value={idx}
                                checked={idx === hmCards}
                                onChange={(e) => gameDispatch({ type: 'card', payload: Number(e.target.value) })}
                            />
                            <label htmlFor={`numbers-${idx}`}
                                tabIndex={9}
                                role="button"
                                aria-pressed={idx === hmCards}
                            ><i className="far fa-circle"></i> {idx}</label>
                        </span>
                    )}
                </div>
                <div>
                    <h6>Número de coringas</h6>
                    {[0, 1, 2, 3, 4].map((joker, i) =>
                        <span key={`jokers-${i}`}>
                            <input id={`jokers-${i}`} type="radio" name="jokers" value={joker}
                                checked={joker === hmJokers}
                                onChange={(e) => gameDispatch({ type: 'joker', payload: Number(e.target.value) })}
                            />
                            <label htmlFor={`jokers-${i}`}
                                tabIndex={9}
                                role="button"
                                aria-pressed={joker === hmJokers}
                            ><i className="far fa-circle"></i> {joker}</label>
                        </span>
                    )}
                </div>
                <div>
                    <h6>Remover naipes</h6>
                    {suitList.map((suit, i) =>
                        <span key={`suit-${i}`}>
                            <input id={`suit-${i}`} type="checkbox" name="suits" value={suit.key}
                                checked={rmSuits.includes(suit.key)}
                                onChange={() => rmSuits.includes(suit.key) ? gameDispatch({ type: 'suit', payload: rmSuits.filter((s) => s !== suit.key) }) : gameDispatch({ type: 'suit', payload: [...rmSuits, suit.key] })}
                            />
                            <label htmlFor={`suit-${i}`}
                                tabIndex={9}
                                role="button"
                                aria-pressed={rmSuits.includes(suit.key)}
                            ><i className="fas fa-check"></i> {suit.name}</label>
                        </span>
                    )}
                </div>
                <div className="rankOptions">
                    <h6>Remover valores</h6>
                    {rankList.map((rank, i) =>
                        <span key={`rank-${i}`}>
                            <input id={`rank-${i}`} type="checkbox" name="ranks" value={rank}
                                checked={rmRanks.includes(rank)}
                                onChange={() => rmRanks.includes(rank) ? gameDispatch({ type: 'rank', payload: rmRanks.filter((r) => r !== rank) }) : gameDispatch({ type: 'rank', payload: [...rmRanks, rank] })}
                            />
                            <label htmlFor={`rank-${i}`}
                                tabIndex={9}
                                role="button"
                                aria-pressed={rmRanks.includes(rank)}
                            ><i className="fas fa-check"></i> {rank === 'T' ? '10' : rank}</label>
                        </span>
                    )}
                </div>
            </form>
            <div>
                <h6>Baralho usado</h6>
                {deckList.map((deckItem, i) =>
                    <span key={`deck${i}`}>
                        <input id={`deck${i}`} type="radio" name="decks" value={deckItem.key}
                            checked={deckItem.key === deck}
                            onChange={(e) => gameDispatch({ type: 'deck', payload: e.target.value })}
                        />
                        <label htmlFor={`deck${i}`}
                            tabIndex={9}
                            role="button"
                            aria-pressed={deckItem.key === deck}
                        ><i className="far fa-circle"></i> {deckItem.name}</label>
                    </span>
                )}
            </div>
            <LangSelector />
            <div>
                <h6>Créditos</h6>
                <small><a href="https://greebles.itch.io/pixel-plebes" target="_blank" rel="noopener noreferrer">Pixel Plebes by Devlyn JD</a></small>
            </div>
        </div>

    )

}

export default Options
