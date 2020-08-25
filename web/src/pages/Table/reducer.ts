export interface IStates {
    inHand: string[]
    toSwap: string[]
    head: string | null
    hand: {
        name: string | null
        desc: string | null
        rarity: number | null
    }
    swaps: number
    allowNew: boolean
    allowSwap: boolean
    allowStop: boolean
}

export interface IAction {
    type: "canSwap" | "canNew" | "requestNew" | "receiveNew" | "receiveSwap" | "requestSelect" | "requestSwap" | "requestStop"
    payload?: any
}

export function tableReducer(state: IStates, action: IAction) {
    switch (action.type) {
        case 'canSwap':
            return {
                ...state,
                allowSwap: action.payload
            }

        case 'canNew':
            return {
                ...state,
                allowNew: action.payload
            }

        case 'requestNew':
            return {
                ...state,
                inHand: [],
                toSwap: [],
                head: 'Embaralhando...',
                swaps: 0,
                allowNew: false,
                allowStop: false,
            }

        case 'receiveNew':
            return {
                ...state,
                inHand: action.payload.inHand,
                head: null,
                hand: action.payload.hand,
                allowStop: true
            }

        case 'requestSelect':
            return {
                ...state,
                toSwap: action.payload.swap
            }

        case "requestSwap":
            return {
                ...state,
                inHand: [],
                toSwap: [],
                head: 'Trocando...',
                allowStop: false
            }

        case "receiveSwap":
            return {
                ...state,
                inHand: action.payload.inHand,
                head: null,
                hand: action.payload.hand,
                swaps: action.payload.swaps,
                allowStop: true
            }

        case "requestStop":
            return {
                ...state,
                toSwap: [],
                allowNew: true,
                allowStop: false
            }

        default:
            return state
    }
}
