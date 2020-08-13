import React, { createContext, useState } from 'react'

export interface ILogsItem {
    user: {
        name: string,
        email?: string,
        room: number | null
    },
    id: string,
    name: string,
    hand: string[],
    swap: number,
    jokers: number,
    suits: string[],
    ranks: string[]
}

interface ILogsContext {
    logs: ILogsItem[],
    sendLog(item: ILogsItem): void
}

const LogsContext = createContext<ILogsContext>({} as ILogsContext)

export const LogsProvider: React.FC = ({ children }) => {

    const [logs, setLogs] = useState<ILogsItem[]>([])

    function sendLog(item: ILogsItem) {

        setLogs([...logs, item])

    }

    return (
        <LogsContext.Provider value={{
            logs, sendLog
        }}>
            {children}
        </LogsContext.Provider>
    )

}

export default LogsContext
