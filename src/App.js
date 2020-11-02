import React from 'react'
import { Switch } from 'react-router-dom'
import LoggedOutRoute from './routes/LoggedOutRoute'
import PrivateRoute from 'routes/PrivateRoute'
import SignIn from 'containers/SignIn'
import Tickets from 'containers/Tickets'
import Ticket from 'containers/Ticket'
import Reports from 'containers/Reports'

import 'antd/dist/antd.css'
import MainLayoutWithContext from 'containers/MainLayout/MainLayoutWithContext'
import Users from 'containers/Users'
import Home from 'containers/Home'
import User from 'containers/User'
import Calls from 'containers/Calls'
function App() {
  return (
    <Switch>
      <LoggedOutRoute exact path="/signin" component={SignIn} />
      <MainLayoutWithContext>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/ticket/:id/" component={Ticket} />
        <PrivateRoute exact path="/tickets" component={Tickets} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/users/:id/details" component={User} />
        <PrivateRoute exact path="/reports" component={Reports} />
        <PrivateRoute exact path="/calls" component={Calls}/>
      </MainLayoutWithContext>
      {/* <PrivateRoute exact path="/" component={PrimarySearchAppBar} /> */}
    </Switch>
  )
}

export default App
