import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from '../login/login'
import Dashboard from '../components/dashboard'
import Search from '../components/search'
import Profile from '../components/profile'

//search, profile, dashboard
export default function Nav(){
    return(
        <div>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path='/search' component={Search}/>
                <Route path='/profile' component={Profile}/>
            </Switch>
        </div>
    )
}