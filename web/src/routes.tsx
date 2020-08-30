import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Enter from './pages/Enter'
import Table from './pages/Table'
import Show from './pages/Show'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={process.env.PUBLIC_URL} exact component={Enter} />
                <Route path={`${process.env.PUBLIC_URL}/play`} component={Table} />
                <Route path={`${process.env.PUBLIC_URL}/show/:id?`} component={Show} />
                <Route path={`${process.env.PUBLIC_URL}/*`} >
                    <Redirect to={`${process.env.PUBLIC_URL}`} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
