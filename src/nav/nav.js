import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Nav extends Component{
    logout(){
        axios.post('api/logout')
        .then(this.props.history.push('/'))
    }
    render(){
        //set up Nav's conditional rendering
        //set up as else if then ask how to make switch statement 
        //search, profile, dashboard
        if(this.props.location.pathname !== '/'){
            if(this.props.location.pathname === '/dashboard'){
                return(
                    <div className='navDivs'>
                        <div className='navImgs'>
                        <h1 className='navH1'>Helo</h1>
                        <Link to='/dashboard'>
                            <img src='home.png' alt='select to return to dashboard'/>
                        </Link>
                        <Link to='/search'>
                            <img src='search.png' alt='select to return to search'/>
                        </Link>
                        </div>
                        <h2 className='navH2'>Dashboard</h2>
                        <button className='logoutBtn' onClick={() => this.logout()}>Logout</button>
                    </div>
                )
            }else if(this.props.location.pathname === '/search'){
                return(
                    <div className='navDivs'>
                        <div className='navImgs'>
                        <h1 className='navH1'>Helo</h1>
                        <Link to='/dashboard'>
                            <img src='home.png' alt='select to return to dashboard'/>
                        </Link>
                        <Link to='/search'>
                            <img src='search.png' alt='select to return to search'/>
                        </Link>
                        </div>
                        <h2 className='navH2'>Search</h2>
                        <button className='logoutBtn' onClick={() => this.logout()}>Logout</button>
                    </div>
                )
            }else if(this.props.location.pathname === '/profile'){
                return(
                    <div className='navDivs'>
                        <div className='navImgs'>
                        <h1 className='navH1'>Helo</h1>
                        <Link to='/dashboard'>
                            <img src='home.png' alt='select to return to dashboard'/>
                        </Link>
                        <Link to='/search'>
                            <img src='search.png' alt='select to return to search'/>
                        </Link>
                        </div>
                        <h2 className='navH2'>Profile</h2>
                        <button className='logoutBtn' onClick={() => this.logout()}>Logout</button>
                    </div>
                )
            }else{
                return null
            }
        }else{
            return null
        } 
    }
}

export default withRouter(Nav)