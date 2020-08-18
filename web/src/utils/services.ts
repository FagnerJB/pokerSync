import axios from 'axios'

export interface ILogsItem {
    user: {
        name: string
        email?: string
    }
    deal: {
        id: string
        name: string
        hand: string[]
        swap: number
        suits?: string[]
        ranks?: string[]
        jokers?: number
        time?: string
    }
}

export const baseURL = 'http://localhost:3333'

export const api = axios.create({
    baseURL
})
