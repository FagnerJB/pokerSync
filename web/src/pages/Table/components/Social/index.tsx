import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import TableContext from '../../../../contexts/table'

import { renderFace } from '../../../../localization'

import { ILogsItem } from '../../interfaces'

import './style.css'

const Gravatar = require('react-gravatar')

interface IUserState {
    name: string
    email?: string
}

interface ISocialProps {
    logs: ILogsItem[]
    room: string
}

const Social: React.FC<ISocialProps> = (props) => {

    const { logs, room } = props

    const [user, setUser] = useState<IUserState>({} as IUserState)
    const [seen, setSeen] = useState(logs.length)
    const [badge, setBadge] = useState(0)

    const { toggle, setOption } = useContext(TableContext)

    useEffect(() => {

        const localName = localStorage.getItem("pokerSync")

        if (localName) {

            const localUser = JSON.parse(localName)

            setUser({
                name: localUser.name,
                email: localUser.email
            })

        }

    }, [])

    useEffect(() => {

        if (toggle !== "social") {
            setBadge(logs.length - seen)
        } else {
            setBadge(0)
            setSeen(logs.length)
        }

        // eslint-disable-next-line
    }, [logs, toggle])

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
                <button type="button" className="closeBtn" data-badge={badge}
                    onClick={() => setOption("toggle", toggle === "social" ? "none" : "social")}
                ><i className="fas fa-user-friends"></i></button>
                {user.email && <Gravatar email={user.email} alt={`Imagem de ${user.name}`} className="gravatar" />}
                <h4>{user.name}</h4>
                <p className="roomNum">Sala: {room} <i className="far fa-copy"></i></p>
                <p className="backBtn"><Link to="/">Voltar</Link></p>
            </header>
            <div className="logs">
                {logs.length > 0 ? <ul>{logs.map((item) => renderLog(item))}</ul> : "As jogadas aparecerão aqui."}
            </div>
        </div>
    )
}

export default Social
