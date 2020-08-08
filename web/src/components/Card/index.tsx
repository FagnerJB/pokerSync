import React, { useState } from 'react';

import './style.css'

interface CardProps {
    face: string,
    deck: string,
    selected: boolean
}

function cardClasses(deck: string, face: string, selected: boolean) {

    let classes = ["card"]

    if (deck === "anim")
        if (["A", "K", "Q", "J", "O"].includes(face.slice(0, 1)))
            classes.push("full", deck)
        else
            classes.push("full")
    else
        classes.push(deck)

    if (selected)
        classes.push("selected")

    return classes.join(" ")

}

function cardImage(deck: string, face: string) {

    const base_url = 'https://fagnerjb.com/jbwp/wp-content/uploads/poker/'

    if (deck === "anim")
        if (!["A", "K", "Q", "J", "O"].includes(face.slice(0, 1)))
            deck = "full"

    if (deck !== "mini" && ["Od", "Oh"].includes(face)) {
        face = "Or"
    }
    if (deck !== "mini" && ["Os", "Oc"].includes(face)) {
        face = "Ob"
    }
    if (deck === "mini" && ["Od", "Oh", "Os", "Oc"].includes(face)) {
        face = "Or"
    }

    return base_url + deck + "/" + face + ".png"

}

const Card: React.FC<CardProps> = (props) => {

    return (
        <div className={cardClasses(props.deck, props.face, props.selected)}>
            <img alt={props.face} src={cardImage(props.deck, props.face)} />
        </div>
    )
}

export default Card
