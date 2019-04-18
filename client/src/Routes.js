import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './Routes/Auth'
import Feed from './Routes/Feed'
import Explore from './Routes/Explore'
import Profile from './Routes/Profile'
import Search from './Routes/Search/Search'
import Post from './Routes/Post'

const PrivateRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route exact path="/:username" component={Profile} />
    <Route exact path="/post/:postId" component={Post} />
  </Switch>
)

const PublicRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
)

const Router = ({ isAuthenticated }) =>
  isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />

export default Router
