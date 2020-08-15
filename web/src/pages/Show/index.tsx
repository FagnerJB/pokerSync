import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import Card from '../../components/Card'
import { cardClasses, cardImage } from '../../utils/cardFunctions'

import api from '../../services/api';
import { renderName } from '../../localization'

function Show(props: any) {

    const id = props.match.params.id

    const [hand, setHand] = useState<string[]>([])
    const [handName, setHandName] = useState("")

    useEffect(() => {

        if (id) {

            api.get(`/deal/${id}`).then(res => {

                setHand(res.data.hand)
                setHandName(renderName(res.data.text, 'pt'))

            })

        }

        // eslint-disable-next-line
    }, [])

    return (

        <>
            <header className="hand-name">
                <h2>{handName || "Carregando..."}</h2>
            </header>
            <div className="table">
                {hand.map((face, i) => {

                    return (
                        <div key={`card-${i}`} className={cardClasses("full")}>
                            <Card face={face} src={cardImage("full", face)} back={cardImage("full", "back")} />
                        </div>
                    )

                })}
            </div>
            <div className="backBtns">
                <Link to="/">Voltar</Link>
            </div>
        </>

    )

}

export default Show
