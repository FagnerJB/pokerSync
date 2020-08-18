import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Enter from './pages/Enter'
import Table from './pages/Table'
import Show from './pages/Show'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Enter} />
            <Route path="/play" exact component={Table} />
            <Route path="/play/:id" component={Show} />
        </BrowserRouter>
    )
}

export default Routes
