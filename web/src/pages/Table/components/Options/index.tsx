import React, { useContext, FormEvent, ChangeEvent } from 'react'
import TableContext from '../../../../contexts/table'

import './style.css'

const emoji = require('node-emoji')

function Options() {

    const { hmCards, hmJokers, rmSuits, rmRanks, deck, lang, toggle, setOption, setInitial } = useContext(TableContext)

    const suitList = [
        { key: "s", name: "Espadas " + emoji.get("spades") },
        { key: "d", name: "Ouros " + emoji.get("diamonds") },
        { key: "c", name: "Paus " + emoji.get("clubs") },
        { key: "h", name: "Copas " + emoji.get("hearts") }
    ]
    const rankList = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
    const deckList = [
        { key: "mini", name: "Simples" },
        { key: "full", name: "Pixel" },
        { key: "anim", name: "Pixel Animado" }
    ]
    const langList = [
        { key: "pt", title: "Português", name: emoji.get("flag-br") + emoji.get("flag-pt") },
        //{ key: "en", title: "Inglês", name: emoji.get("flag-us") + emoji.get("uk") }
    ]

    function handleReset(e: FormEvent) {

        e.preventDefault()
        setInitial()

    }

    function handleLang(e: ChangeEvent<HTMLInputElement>): void {
        setOption('lang', e.target.value)
        localStorage.setItem('pokerSync_lang', e.target.value)
    }

    function handleDeck(e: ChangeEvent<HTMLInputElement>): void {
        setOption('deck', e.target.value)
        localStorage.setItem('pokerSync_deck', e.target.value)
    }

    return (
        <div className={"optionsPanel" + (toggle === "options" ? " opened" : "")}>
            <header>
                <button type="button" className="closeBtn" onClick={() => setOption("toggle", toggle === "options" ? "none" : "options")}><i className="fas fa-bars"></i></button>
                <h4>Configurações</h4>
                <p><a href="https://fagnerjb.com/logs/europair" target="_blank" rel="noopener noreferrer">Como usar</a> </p>
                <button className="resetBtn" type="reset" onClick={handleReset}>Limpar</button>
            </header>
            <form>
                <div>
                    <h6>Número de cartas</h6>
                    {[5, 4, 3, 2, 1].map((idx) =>
                        <span key={"numbers-" + idx}>
                            <input id={"numbers-" + idx} type="radio" name="numbers" value={idx}
                                checked={idx === hmCards}
                                onChange={(e) => setOption('card', Number(e.target.value))}
                            />
                            <label htmlFor={"numbers-" + idx}
                                tabIndex={9}
                                role="button"
                                aria-pressed={idx === hmCards}
                            ><i className="far fa-circle"></i> {idx}</label>
                        </span>
                    )}
                </div>
                <div>
                    <h6>Número de Coringas</h6>
                    {[0, 1, 2, 3, 4].map((joker, i) =>
                        <span key={"jokers-" + i}>
                            <input id={"jokers-" + i} type="radio" name="jokers" value={joker}
                                checked={joker === hmJokers}
                                onChange={(e) => setOption('joker', Number(e.target.value))}
                            />
                            <label htmlFor={"jokers-" + i}
                                tabIndex={9}
                                role="button"
                                aria-pressed={joker === hmJokers}
                            ><i className="far fa-circle"></i> {joker}</label>
                        </span>
                    )}
                </div>
                <div>
                    <h6>Remover Naipes</h6>
                    {suitList.map((suit, i) =>
                        <span key={"suit-" + i}>
                            <input id={"suit-" + i} type="checkbox" name="suits" value={suit.key}
                                checked={rmSuits.includes(suit.key)}
                                onChange={() => rmSuits.includes(suit.key) ? setOption('suit', rmSuits.filter((s) => s !== suit.key)) : setOption('suit', [...rmSuits, suit.key])}
                            />
                            <label htmlFor={"suit-" + i}
                                tabIndex={9}
                                role="button"
                                aria-pressed={rmSuits.includes(suit.key)}
                            ><i className="fas fa-check"></i> {suit.name}</label>
                        </span>
                    )}
                </div>
                <div>
                    <h6>Remover Valores</h6>
                    {rankList.map((rank, i) =>
                        <span key={"rank-" + i}>
                            <input id={"rank-" + i} type="checkbox" name="ranks" value={rank}
                                checked={rmRanks.includes(rank)}
                                onChange={() => rmRanks.includes(rank) ? setOption('rank', rmRanks.filter((r) => r !== rank)) : setOption('rank', [...rmRanks, rank])}
                            />
                            <label htmlFor={"rank-" + i}
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
                    <span key={"deck" + i}>
                        <input id={"deck" + i} type="radio" name="decks" value={deckItem.key}
                            checked={deckItem.key === deck}
                            onChange={handleDeck}
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
                            onChange={handleLang}
                        />
                        <label htmlFor={"lang-" + i}
                            tabIndex={9}
                            role="button"
                            aria-pressed={langItem.key === lang}
                        ><i className="far fa-circle"></i> {langItem.name}</label>
                    </span>
                )}
            </div>
            <div><small><a href="https://greebles.itch.io/pixel-plebes" target="_blank" rel="noopener noreferrer">Pixel Plebes by Devlyn JD</a></small></div>
        </div>

    )

}

export default Options
