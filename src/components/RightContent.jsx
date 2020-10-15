import React from 'react'
import { Route, Switch } from 'react-router'
import HumanDetail from './HumanDetail'

const RightContent = ({ label, className, active}) => {
  return (
    <Switch>
      <Route exact path="/">
        <h1>Select a human</h1>
      </Route>
      <Route exact path="/:hId">
        <HumanDetail />
      </Route>
    </Switch>
  )
}

export default RightContent