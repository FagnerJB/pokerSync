import React from 'react'

import Routes from './routes'
import { TableProvider } from './contexts/table'

import './assets/global.css'

function App() {

    return (
        <TableProvider>
            <Routes />
        </TableProvider>
    )

}

export default App
