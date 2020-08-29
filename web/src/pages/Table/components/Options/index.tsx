import React, { useContext, FormEvent, ChangeEvent, useState, useEffect } from 'react'
import TableContext from '../../../../contexts/table'

import './style.css'

const emoji = require('node-emoji')



function Options() {

    const { hmCards, hmJokers, rmSuits, rmRanks, deck, lang, toggle, setOption, setInitial } = useContext(TableContext)

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
    const langList = [
        { key: "pt", title: "Português", name: emoji.get("flag-br") + emoji.get("flag-pt") },
        { key: "en", title: "Inglês", name: emoji.get("flag-us") + emoji.get("uk") },
        { key: "eo", title: "Esperanto", name: <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAeCAYAAAC16ufeAAAC/0lEQVRYR+2YXUhTYRjH/+/ZkU2TZZsnT/Z1leUUuxBJImeYGkXkwixUugivvSgoQhGR7roQIlCELia6dELZICJISKH1gRFYaqOvC2dHY35Mnaw1tzfO2QdTVyT7cBd7OZyPh/f9P7/34fCc5zwE/qFUKlWNjY3Xqi/WXOV5fm/A/q/r3dd3cP9dx/9M3focJ7G5LTAum52tWMaCKEDEE8/zXK/hwZBGoynYimpMYf0gnjk6bje4yrGKnyIsazQOPC3Rais2glpXrMhOz4aMyMLuIR6wkmOBHZnXOyqIVltW2ddveEYIkaIcGGteN3SmKtwouonSfSe3FxaA4yGtIh2dnQad7kLdRprh6WHUP6lFYVYhBnWmsNGNW2QBuCe8/WTsw8dZjuOyRNg55xy+2D9jdGYUj78OwrJgkfbQkN+Agt1HUcQXgU/bAwWrkOzxhCUuZpEIM7NUdExB0fyyCd3jeuk+3FAr1HhUNYhDu3LiDitlgwCs+OClXrSYm6EPA8ylcTCeG8ARVW5wH/GM7CbYQIRL+k7g+9K3IBQBQc/ZXpQdOLUu4NsO66EeFBuO4Ydjeh2Y/kw3Kg+eTizYqZUplA+UIS8zT0pbrwQzusa6UJdbh7bjtxMLVlgV8Gl+UsqtLMNKcDanDcPWF6jJuZRYsGHTwF+M2/7OJjRsi+kWpSFpVfroUulYN/xmn83/8HbajPfC6Fb2F9Fcom5ShP8CRCQbm8VJ2NjEFUhGNhlZMQkls0GM3gOivp46DwVVxUg/arLkN7NIlDpFf4oGl6OmGiMh9ySMRH5Yfj69mphi5CNqstLfLYCUjCuK57L9KI2acpSFPFaM2Ht+Vfh6BTuQlVEvH5Jlkvwo+4lYbmNHxieohCq9OKVVnsfWIpVyEXuJVMBJbK6JtT7HG3dbsNfV3t5+T9QV60SxKcOkMRmEpTtlSibbC0qC9aJYOwZqyZB7cY1Ytol/xgxhfNVj6LxAvblpveQV8DeCvJSCIQQywtK1FbfgcdIluGAPZfsDKMpWZmfJCJMAAAAASUVORK5CYII=" className="flag-png" alt="Esperanto" /> }
    ]

    useEffect(() => {

        const number = rmSuits.length + rmRanks.length + (hmJokers > 0 ? 1 : 0)
        setBadge(number)

    }, [hmJokers, rmSuits, rmRanks])

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
                <button type="button" className="closeBtn" data-badge={badge}
                    onClick={() => setOption("toggle", toggle === "options" ? "none" : "options")}
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
                                onChange={(e) => setOption('card', Number(e.target.value))}
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
                                onChange={(e) => setOption('joker', Number(e.target.value))}
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
                                onChange={() => rmSuits.includes(suit.key) ? setOption('suit', rmSuits.filter((s) => s !== suit.key)) : setOption('suit', [...rmSuits, suit.key])}
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
                                onChange={() => rmRanks.includes(rank) ? setOption('rank', rmRanks.filter((r) => r !== rank)) : setOption('rank', [...rmRanks, rank])}
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
                            onChange={handleDeck}
                        />
                        <label htmlFor={`deck${i}`}
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
                    <span key={`lang-${i}`}>
                        <input id={`lang-${i}`} type="radio" name="lang" value={langItem.key} title={langItem.title}
                            checked={langItem.key === lang}
                            onChange={handleLang}
                        />
                        <label htmlFor={`lang-${i}`}
                            tabIndex={9}
                            role="button"
                            aria-pressed={langItem.key === lang}
                        ><i className="far fa-circle"></i> {langItem.name}</label>
                    </span>
                )}
            </div>
            <div>
                <h6>Créditos</h6>
                <small><a href="https://greebles.itch.io/pixel-plebes" target="_blank" rel="noopener noreferrer">Pixel Plebes by Devlyn JD</a></small>
            </div>
        </div>

    )

}

export default Options
