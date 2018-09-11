import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { updateUserid } from '../ducks/reducer'

class Search extends Component {
    constructor() {
        super()

        this.state = {
            otherUsers: [],
            hasSearched: false,
            searchName: '',
            selectVal: '',
            // searchToggle: false
        }
        this.mapAllNots = this.mapAllNots.bind(this)
        this.reset = this.reset.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.search = this.search.bind(this)
        this.mapSearch = this.mapSearch.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
        // this.axGet = this.axGet.bind(this)
    }
    //set up two get all friends axios calls in if else
    //add friend array to state
    //display all users by 
    componentDidMount() {
        if (!this.props.userid) {
            axios.get('/api/userData')
                .then(res => {
                    this.props.updateUserid(res.data.userid)
                    axios.get('api/getAllNotFriends')
                        .then((res) => { this.setState({ otherUsers: res.data }) })
                }).catch(err => {
                    this.props.history.push('/')
                })
        }
    }
    addFriend(i, id) {
        axios.post(`/api/addFriend/${id}`)
            .then(() => this.search())
    }
    removeFriend(i, id) {
        axios.delete(`/api/removeFriend/${id}`)
        .then(() => this.search())
    }
    reset() {
        axios.get('api/getAllNotFriends')
            .then((res) => { this.setState({ otherUsers: res.data }) })
    }
    //get search map to display both if and else if
    // overwrite state
    search() {
        if (this.state.selectVal) {
            axios.get(`/api/searchVal/${this.state.selectVal}`)
                .then((res) => {
                    this.setState({ otherUsers: [...res.data], hasSearched: true })
                    console.log(res.data)
                })
        } else if (this.state.searchName) {
            alert('Please select a search type from the select box')
        } else if(this.state.selectVal && this.state.searchName){
            axios.get(`/api/searchBoth/${this.state.selectVal}/${this.state.searchName}`)
        }else{
            this.reset()
        }
        //take in selectVal and searchName
        //send thorugh params
        //in .then set equal to others array
        //build out mapping with conditional redering for buttons and invoke        
    }
    mapSearch() {
        //start wiht map
        return this.state.otherUsers.map((ele, i) => {
            // then if(ele.not_frineds = true){map with add friend}else{map with delete friend}
            return (
                <div key={i}>
                    <img className='userPic' src={`https://robohash.org/${ele.userid}.png?set=set4`} alt='randomly generated kitten acting as another users profile picture' />
                    <div>
                        <p>{ele.first_name}</p>
                        <p>{ele.last_name}</p>
                    </div>
                    {/* build out put req for button */}
                    {ele.not_friends === true 
                    ? <button onClick={() => this.addFriend(i, ele.userid)}>Add Friend</button>
                    :<button onClick={() => this.removeFriend(i, ele.userid)}>Remove Friend</button>}
                </div>
            )
        })
    }
    mapAllNots() {
        return this.state.otherUsers.map((ele, i) => {
            return (
                <div key={i}>
                    <img className='userPic' src={`https://robohash.org/${ele.userid}.png?set=set4`} alt='randomly generated kitten acting as another users profile picture' />
                    <div>
                        <p>{ele.first_name}</p>
                        <p>{ele.last_name}</p>
                    </div>
                    {/* build out put req for button */}
                    <button onClick={() => this.addFriend(i, ele.userid)}>Add Friend</button>
                </div>
            )
        })
    }
    //if search toggle is true take the input value from the box and from the input and make those the params
    render() {
        return (
            <div>
                <div>
                    <div>
                        <select onChange={e => this.setState({ selectVal: e.target.value })}>
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
                    <button onClick={this.search}>Search</button>
                    {/* display all friends again */}
                    <button onClick={this.reset}>Reset</button>
                </div>
                <div>
                    {/* {this.mapAllNots()} */}
                    {this.state.hasSearched === true ? this.mapSearch() : this.mapAllNots()}
                </div>
            </div>
        )
    }
}
export default connect(null, { updateUserid })(Search)