export interface ILogsItem {
    user: {
        name: string
        email?: string
    },
    id: string
    name: string
    hand: string[]
    swap: number
    jokers: number
    suits: string[]
    ranks: string[]
}
