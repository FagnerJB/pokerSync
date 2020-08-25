import React from 'react'

import { ReactComponent as HighCard } from './assets/1HighCard.svg'
import { ReactComponent as Pair } from './assets/2Pair.svg'
import { ReactComponent as TwoPair } from './assets/3TwoPair.svg'
import { ReactComponent as ThreeOfAKind } from './assets/4ThreeOfAKind.svg'
import { ReactComponent as Straight } from './assets/5Straight.svg'
import { ReactComponent as Flush } from './assets/6Flush.svg'
import { ReactComponent as FullHouse } from './assets/7FullHouse.svg'
import { ReactComponent as FourOfAKind } from './assets/8FourOfAKind.svg'
import { ReactComponent as StraightFlush } from './assets/9StraightFlush.svg'
import { ReactComponent as RoyalFlush } from './assets/9RoyalFlush.svg'
import { ReactComponent as FiveOfAKind } from './assets/10FiveOfAKind.svg'

interface IIconProps {
    name: string
}

const Icon: React.FC<IIconProps> = (props) => {

    switch (props.name) {
        case "High Card":
            return <HighCard />
        case "Pair":
            return <Pair />
        case "Two Pair":
            return <TwoPair />
        case "Three of a Kind":
            return <ThreeOfAKind />
        case "Straight":
            return <Straight />
        case "Flush":
            return <Flush />
        case "Full House":
            return <FullHouse />
        case "Four of a Kind":
            return <FourOfAKind />
        case "Straight Flush":
            return <StraightFlush />
        case "Royal Flush":
            return <RoyalFlush />
        case "Five of a Kind":
            return <FiveOfAKind />
        default:
            return <></>
    }

}

export default Icon
