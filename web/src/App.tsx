import React from 'react'

import Routes from './routes'
import { GameProvider } from './contexts/game'

import './assets/global.css'

function App() {

    return (
        <GameProvider>
            <Routes />
        </GameProvider>
    )

}

export default App
