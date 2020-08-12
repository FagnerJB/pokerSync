import React from 'react'

import Routes from './routes'
import { TableProvider } from './contexts/table'
import { LogsProvider } from './contexts/logs'

import './assets/global.css'

function App() {

    return (
        <TableProvider>
            <LogsProvider>
                <Routes />
            </LogsProvider>
        </TableProvider>
    )

}

export default App
