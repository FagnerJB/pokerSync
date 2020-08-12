import React from 'react';

import './style.css'

interface ICardProps {
    face: string,
    src: string,
    back: string
}

const Card: React.FC<ICardProps> = (props) => {

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img alt="Carregando imagem" src={props.back} />
                </div>
                <div className="flip-card-back">
                    <img alt={props.face} src={props.src} data-face={props.face} />
                </div>
            </div>
        </div>
    )

}

export default Card
