import React, { useContext } from 'react'

import Icon from './Icon'

import GameContext from '../../contexts/game'
import { renderName } from '../../localization'

interface IFullNameProps {
    hand: {
        name: string
        desc: string
        rarity: number
    }
}

const FullName: React.FC<IFullNameProps> = (props) => {

    const name = props.hand.desc === "Royal Flush" ? props.hand.desc : props.hand.name
    const { hand } = props
    const { lang } = useContext(GameContext)

    return (
        <strong className={`icon-name rarity-${hand.rarity}`} title={renderName(hand, lang)}>
            <Icon name={name} /><span>{renderName(hand, lang)}</span>
        </strong>
    )
}

export default FullName
