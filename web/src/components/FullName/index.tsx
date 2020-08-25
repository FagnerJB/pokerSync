import React, { useContext } from 'react'

import Icon from './Icon'

import TableContext from '../../contexts/table'
import { renderName } from '../../localization'

interface IFullNameProps {
    hand: {
        name: string
        desc: string
        rarity: number
    }
}

const FullName: React.FC<IFullNameProps> = (props) => {

    const { hand } = props
    const { lang } = useContext(TableContext)

    return (
        <strong className={`rarity-${hand.rarity}`}>
            <Icon name={hand.name} /><span>{renderName(hand, lang)}</span>
        </strong>
    )
}

export default FullName
