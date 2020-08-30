import React, { useContext } from 'react'

import GameContext from '../../contexts/game'

import { translate } from '../../localization'

interface ITextProps {
    s: string
}

const Text: React.FC<ITextProps> = (props) => {

    const { lang } = useContext(GameContext)

    return (
        <>
            {translate(props.s, lang)}
        </>
    )

}

export default Text
