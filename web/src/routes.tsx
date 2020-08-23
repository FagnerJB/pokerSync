import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Enter from './pages/Enter'
import Table from './pages/Table'
import Show from './pages/Show'

function Routes() {
    return (
        <BrowserRouter>
            <Route path={process.env.PUBLIC_URL} exact component={Enter} />
            <Route path={`${process.env.PUBLIC_URL}/play`} exact component={Table} />
            <Route path={`${process.env.PUBLIC_URL}/show/:id`} component={Show} />
        </BrowserRouter>
    )
}

export default Routes
