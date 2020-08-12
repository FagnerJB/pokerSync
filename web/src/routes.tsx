import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Enter from './pages/Enter'
import Table from './pages/Table'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Enter} />
            <Route path="/table" component={Table} />
        </BrowserRouter>
    )
}

export default Routes
