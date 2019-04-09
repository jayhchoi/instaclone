import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from './Routes/Auth'
import Feed from './Routes/Feed'

const PrivateRoutes = () => {
  return <Route exact path="/" component={Feed} />
}

const PublicRoutes = () => {
  return <Route exact path="/" component={Auth} />
}

const Router = ({ isAuthenticated }) => (
  <BrowserRouter>
    <Switch>{isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}</Switch>
  </BrowserRouter>
)

export default Router
