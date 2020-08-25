import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import Gravatar from './Gravatar'
import FullName from '../../../../../components/FullName'

import { renderFace } from '../../../../../localization'
import { appBaseURI } from '../../../../../utils/services'
import { ILogsItem } from '../../../../../utils/services'

interface ILogProps {
    data: ILogsItem
}

const Log: React.FC<ILogProps> = (props) => {

    const lang = "pt"

    const { deal, user } = props.data
    const [copied, setCopied] = useState('')

    const swaps = "troca" + (deal.swaps === 1 ? "" : "s")
    const jokers = `Mais ${deal.jokers} coringa` + (deal.jokers === 1 ? "" : "s")
    const suits = deal.suits && `Menos ${deal.suits.length} naipe` + (deal.suits.length === 1 ? "" : "s") + `: ${deal.suits.map((suit) => renderFace(suit)).join(',')}`
    const ranks = deal.ranks && `Menos ${deal.ranks.length} valor` + (deal.ranks.length === 1 ? "" : "es") + `: ${deal.ranks.sort().map((rank) => renderFace(rank)).join(',')}`

    function handleCopyL(id: string) {
        setCopied(id)

        setTimeout(() => {
            setCopied('')
        }, 2222)
    }

    return (
        <>
            <p title={`${user.name} fez ${deal.hand.name} - ${deal.time}`}>
                <button type="button" className="info-button">
                    {user.email ? <Gravatar email={user.email} name={user.name} size={22} /> : <i className="fas fa-info-circle"></i>}
                </button> <strong>
                    {user.name}
                </strong> fez <FullName hand={deal.hand} lang={lang} /> &bull; <span className="time-log">{deal.time}</span>
            </p>
            <div className="info-box">
                <p>
                    {deal.inHand.map((face) => renderFace(face)).join(',')} com {deal.swaps} {swaps}
                    <CopyToClipboard text={`${appBaseURI}${process.env.PUBLIC_URL}/show/${deal.id}`} onCopy={() => handleCopyL(deal.id)}>
                        <span className={deal.id === copied ? "copyLink copied" : "copyLink"}>
                            <i className="fas fa-check"></i><i className="fas fa-share-square"></i>
                        </span>
                    </CopyToClipboard>
                </p>
                {deal.jokers && <p>{jokers}</p>}
                {deal.suits && <p>{suits}</p>}
                {deal.ranks && <p>{ranks}</p>}
            </div>
        </>
    )

}

export default Log
