import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { updateUserid } from '../ducks/reducer'

class Search extends Component {
    constructor() {
        super()

        this.state = {
            otherUsers: [],
            searchName: '',
            searchToggle: false
        }
    }
    //set up two get all friends axios calls in if else
    //add friend array to state
    //display all users by 
    componentDidMount() {
        if (!this.props.userid) {
            axios.get('/api/userData')
                .then(res => {
                    this.props.updateUserid(res.data.userid)
// finish building out endpoint
                    axios.get('api/getAllFriends')
                }).catch(err => {
                    this.props.history.push('/')
                })
        }
    }
    //if search toggle is true take the input value from the box and from the input and make those the params
    render() {
        return (
            <div>
                <div>
                    <div>
                        <select>
                            {/* 9 options */}
                            <option value='first_name'>First Name</option>
                            <option value='last_name'>Last Name</option>
                            <option value='gender'>Gender</option>
                            <option value='hair_color'>Hair Color</option>
                            <option value='eye_color'>Eye Color</option>
                            <option value='hobby'>Hobby</option>
                            <option value='birth_day'>Birthday Day</option>
                            <option value='birth_month'>Birthday Month</option>
                            <option value='birth_year'>Birthday Year</option>
                        </select>
                    </div>
                    <input onChange={(e) => this.setState({ searchName: e.target.value })}></input>
                    {/* set up search method then invoke */}
                    <button>Search</button>
                    {/* display all friends again */}
                    <button>Reset</button>
                </div>
            </div>
        )
    }
}
export default connect(null, { updateUserid })(Search)