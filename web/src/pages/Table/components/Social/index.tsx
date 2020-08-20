import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'

import TableContext from '../../../../contexts/table'
import { renderFace } from '../../../../localization'
import { ILogsItem } from '../../../../utils/services'

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
    const [copied, setCopied] = useState(false)

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

    function renderLog(log: ILogsItem) {

        const { deal, user } = log

        const swaps = "troca" + (deal.swap === 1 ? "" : "s")
        const jokers = `Mais ${deal.jokers} coringa` + (deal.jokers === 1 ? "" : "s")
        const suits = deal.suits && `Menos ${deal.suits.length} naipe` + (deal.suits.length === 1 ? "" : "s") + `: ${deal.suits.map((suit) => renderFace(suit)).join(',')}`
        const ranks = deal.ranks && `Menos ${deal.ranks.length} valor` + (deal.ranks.length === 1 ? "" : "es") + `: ${deal.ranks.sort().map((rank) => renderFace(rank)).join(',')}`
        const avatar = user.email && <Gravatar email={user.email} alt={`Imagem de ${user.name}`} size={16} />

        return (
            <li key={deal.id}>
                <p>
                    <button type="button" className="info-button"><i className="fas fa-info-circle"></i></button><strong>{user.name}</strong> {avatar} fez <strong title={deal.name}>{deal.name}</strong> &bull; <span className="time-log">{deal.time}</span>
                </p>
                <div className="info-box">
                    <p>{deal.hand.map((face) => renderFace(face)).join(',')} com {deal.swap} {swaps}</p>
                    {deal.jokers && <p>{jokers}</p>}
                    {deal.suits && <p>{suits}</p>}
                    {deal.ranks && <p>{ranks}</p>}
                </div>
            </li>
        )

    }

    function handleCopy() {

        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2222)

    }

    return (
        <div className={"socialPanel" + (toggle === "social" ? " opened" : "")}>
            <header>
                <button type="button" className="closeBtn" data-badge={badge}
                    onClick={() => setOption("toggle", toggle === "social" ? "none" : "social")}
                ><i className="fas fa-user-friends"></i></button>
                {user.email && <a href="https://gravatar.com/" target="_blank" rel="noopener noreferrer"><Gravatar email={user.email} alt={`Imagem de ${user.name}`} className="gravatar" /></a>}
                <h4>{user.name}</h4>
                <CopyToClipboard text={room} onCopy={handleCopy}>
                    <p className={copied ? "roomNum copied" : "roomNum"}>
                        Sala: {room} <i className="far fa-copy"></i><i className="fas fa-check"></i>
                    </p>
                </CopyToClipboard>
                <p className="backBtn"><Link to="/app/pokersync">Voltar</Link></p>
            </header>
            <div className="logs">
                {logs.length > 0 ? <ul>{logs.map((item) => renderLog(item))}</ul> : "As jogadas aparecerão aqui."}
            </div>
        </div>
    )
}

export default Social
