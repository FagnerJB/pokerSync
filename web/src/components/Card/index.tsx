import React, { useContext } from 'react';

import { translate } from '../../localization';
import TableContext from '../../contexts/game'

import './style.css'

interface ICardProps {
    face: string,
    src: string,
    back: string
}

const Card: React.FC<ICardProps> = (props) => {

    const { lang } = useContext(TableContext)

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img alt={translate("Loading image...", lang)} src={props.back} />
                </div>
                <div className="flip-card-back">
                    <img alt={props.face} src={props.src} data-face={props.face} />
                </div>
            </div>
        </div>
    )

}

export default Card
