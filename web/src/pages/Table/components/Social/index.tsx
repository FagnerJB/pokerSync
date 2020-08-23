import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'

import Gravatar from './components/Gravatar'
import Log from './components/Log'

import TableContext from '../../../../contexts/table'
import { ILogsItem } from '../../../../utils/services'

import './style.css'

export interface IUserState {
    name: string
    email?: string
}

interface ISocialProps {
    room: string
    logs: ILogsItem[]
    players: IUserState[]
}

const Social: React.FC<ISocialProps> = (props) => {

    const { logs, room, players } = props
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

        const scroll = document.querySelector('.logs')
        if (scroll)
            scroll.scrollTop = scroll.scrollHeight

        if (toggle !== "social") {
            setBadge(logs.length - seen)

        } else {
            setBadge(0)
            setSeen(logs.length)
        }

        // eslint-disable-next-line
    }, [logs, toggle])

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
                {user.email && <a href="https://gravatar.com/" target="_blank" rel="noopener noreferrer"><Gravatar email={user.email} name={user.name} size={72} /></a>}
                <h4>{user.name}</h4>
                <CopyToClipboard text={room} onCopy={handleCopy}>
                    <p className={copied ? "roomNum copied" : "roomNum"}>
                        Sala: {room} <i className="far fa-copy"></i><i className="fas fa-check"></i>
                    </p>
                </CopyToClipboard>
                <p className="backBtn"><Link to={process.env.PUBLIC_URL}>Voltar</Link></p>
            </header>
            <div className="players">
                {players.length > 1 && <ul>{players.map((item, i) => <li key={`player-${i}`}><Gravatar name={item.name} email={item.email || ""} size={22} /></li>)}</ul>}
            </div>
            <div className="logs">
                {logs.length > 0 ? <ul>{logs.map((item) => <li key={`log-${item.deal.id}`}><Log data={item} /></li>)}</ul> : "As jogadas aparecerão aqui."}
            </div>
        </div>
    )
}

export default Social
