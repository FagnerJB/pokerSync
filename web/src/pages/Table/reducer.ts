export interface IStates {
    handName: string
    inHand: string[]
    toSwap: string[]
    swaps: number
    rarity: number | null
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
                handName: 'Embaralhando...',
                inHand: [],
                toSwap: [],
                swaps: 0,
                allowNew: false,
                allowStop: false,
            }

        case 'receiveNew':
            return {
                ...state,
                inHand: action.payload.hand,
                handName: action.payload.handName,
                rarity: action.payload.rarity,
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
                toSwap: [],
                inHand: [],
                allowStop: false,
                handName: 'Trocando...'
            }

        case "receiveSwap":
            return {
                ...state,
                swaps: action.payload.swaps,
                inHand: action.payload.hand,
                handName: action.payload.handName,
                rarity: action.payload.rarity,
                allowStop: true
            }

        case "requestStop":
            return {
                ...state,
                allowNew: true,
                allowStop: false,
                toSwap: []
            }

        default:
            return state
    }
}
