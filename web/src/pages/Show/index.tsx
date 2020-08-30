import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"

import Card from '../../components/Card'
import Text from '../../components/Text'
import FullName from '../../components/FullName'

import { cardClasses, cardImage } from '../../utils/cardFunctions'
import { api } from '../../utils/services';


interface IHand {
    name: string
    desc: string
    rarity: number
}

function Show(props: any) {

    const { id } = props.match.params

    const history = useHistory()

    const [hand, setHand] = useState<IHand>({} as IHand)
    const [inHand, setInHand] = useState<string[]>([])
    const [handName, setHandName] = useState("Loading...")

    useEffect(() => {

        if (id) {

            api.get(`/deal/${id}`).then(res => {

                setHand(res.data.text)
                setInHand(res.data.hand)
                setHandName("")

            }).catch(res => {

                setHandName("Not found")

            })

        } else {

            history.push(process.env.PUBLIC_URL)

        }

        // eslint-disable-next-line
    }, [])

    return (

        <>
            <header className="hand-name">
                <h2>{<Text s={handName} /> || <FullName hand={hand} />}</h2>
            </header>
            <div className="table">
                {inHand.map((face, i) => {

                    return (
                        <div key={`card-${i}`} className={cardClasses("full")}>
                            <Card face={face} src={cardImage("full", face)} back={cardImage("full", "back")} />
                        </div>
                    )

                })}
            </div>
            {(window.location === window.parent.location) &&
                <div className="backBtns">
                    <Link to={process.env.PUBLIC_URL}><Text s="Back" /></Link>
                </div>
            }
        </>

    )

}

export default Show
