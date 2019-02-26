import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/layout'
import Home from './components/home'
import Admin from './components/admin'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/Admin' component={Admin} />
  </Layout>
)