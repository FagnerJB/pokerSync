import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import TableContext from '../../../../contexts/table'
import LogsContext, { ILogsItem } from '../../../../contexts/logs'

import { renderFace } from '../../../../localization'

import './style.css'

const Gravatar = require('react-gravatar')

interface IUserState {
    name: string,
    email?: string,
    room?: number | null
}

function Social() {

    const [user, setUser] = useState<IUserState>({} as IUserState)

    const { toggle, setOption } = useContext(TableContext)
    const { logs } = useContext(LogsContext)

    useEffect(() => {

        const localName = localStorage.getItem("pokerSync")

        if (localName)
            setUser(JSON.parse(localName))

    }, [])

    function renderLog(obj: ILogsItem) {

        const swaps = "troca" + (obj.swap === 1 ? "" : "s")
        const jokers = `Mais ${obj.jokers} coringa` + (obj.jokers === 1 ? "" : "s")
        const suits = `Menos ${obj.suits.length} naipe` + (obj.suits.length === 1 ? "" : "s") + `: ${obj.suits.map((suit) => renderFace(suit)).join(',')}`
        const ranks = `Menos ${obj.ranks.length} valor` + (obj.ranks.length === 1 ? "" : "es") + `: ${obj.ranks.sort().map((rank) => renderFace(rank)).join(',')}`

        return (
            <li key={obj.id}>
                <p>
                    <button type="button" className="info-button"><i className="fas fa-info-circle"></i></button><strong>{obj.user.name}</strong> fez <strong>{obj.name}</strong>
                </p>
                <div className="info-box">
                    <p>{obj.hand.map((face) => renderFace(face)).join(',')} com {obj.swap} {swaps}</p>
                    {obj.jokers ? <p>{jokers}</p> : ''}
                    {obj.suits.length ? <p>{suits}</p> : ''}
                    {obj.ranks.length ? <p>{ranks}</p> : ''}
                </div>
            </li>
        )

    }

    return (
        <div className={"socialPanel" + (toggle === "social" ? " opened" : "")}>
            <header>
                <button type="button" className="closeBtn" onClick={() => setOption("toggle", toggle === "social" ? "none" : "social")}><i className="fas fa-user-friends"></i></button>
                {user.email && <Gravatar email={user.email} alt={`Imagem de ${user.name}`} className="gravatar" />}
                <h4>{user.name}</h4>
                <p className="roomNum">Sala: {user.room} <i className="far fa-copy"></i></p>
                <p className="backBtn"><Link to="/">Voltar</Link></p>
            </header>
            <div className="logs">
                {logs.length > 0 ? <ul>{logs.map((item) => renderLog(item))}</ul> : "As jogadas aparecerão aqui."}
            </div>
        </div>
    )
}

export default Social
