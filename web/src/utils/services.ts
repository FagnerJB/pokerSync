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
        rarity: number
        swap: number
        suits?: string[]
        ranks?: string[]
        jokers?: number
        time?: string
    }
}

export const serverBaseURI = (process.env.NODE_ENV === "development") ? 'http://localhost:3333' : 'https://fagnerjb.com'
export const serverPathURI = (process.env.NODE_ENV === "development") ? '' : '/api/pokersync'
export const appBaseURI = (process.env.NODE_ENV === "development") ? 'http://localhost:3000' : 'https://fagnerjb.com'

export const api = axios.create({
    baseURL: serverBaseURI + serverPathURI
})
