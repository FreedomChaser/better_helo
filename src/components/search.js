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
            pages: [],
            count: 0,
            currentPage: 1,
            currentIndex: 0
            // offsetToggle: false
        }
        // this.mapAllNots = this.mapAllNots.bind(this)
        this.reset = this.reset.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.search = this.search.bind(this)
        this.mapSearch = this.mapSearch.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
        this.pageNum = this.pageNum.bind(this)
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
                    this.reset(0)
                }).catch(err => {
                    this.props.history.push('/')
                })
        }
    }
    addFriend(i, id) {
        // console.log('id', id)
        let newid = Number(id) 
        axios.post(`/api/addFriend/${newid}`)
            .then(() => this.search(this.state.currentPage, this.state.currentIndex))
    }
    removeFriend(i, id) {
        console.log(id)
        axios.delete(`/api/removeFriend/${id}`)
            .then(() => this.search(this.state.currentPage, this.state.currentIndex))
    }
    reset(offset) {
        axios.get(`api/getAllNotFriends/${offset}`)
            //this.setState Count
            .then((res) => { this.setState({ otherUsers: res.data.allNots }, this.setState({ searchName: '' }, this.setState({ count: res.data.count[0].count }, this.pageNum))) })
    }
    //get search map to display both if and else if
    // overwrite state
    search(ele, i) {
        //get button function up
        // set up page num functionality for if an else if
        let offset = i * 12
        // console.log('i', i)
        // console.log('values', this.state.selectVal, this.state.searchName, offset)
        this.setState({ currentPage: ele })

        if (this.state.selectVal && this.state.searchName) {
            axios.get(`/api/searchBoth/${this.state.selectVal}/${this.state.searchName}/${offset}`)
                .then((res) => { this.setState({ otherUsers: [...res.data.bothMatches] }, this.setState({ count: res.data.count[0].count }, this.pageNum)) })
        } else if (this.state.searchName) {
            alert('Please select a search type from the select box')
        }
        else if (this.state.selectVal) {
            axios.get(`/api/searchVal/${this.state.selectVal}/${offset}`)
                .then((res) => { this.setState({ otherUsers: [...res.data.allValMatches] }, this.setState({ count: res.data.count[0].count }, this.pageNum)) })
        } else {
            this.reset(offset)
        }
        //take in selectVal and searchName
        //send thorugh params
        //in .then set equal to others array
        //build out mapping with conditional redering for buttons and invoke        
    }
    //create method that dbcalls for total users - main
    //in .then invoke pagenum which: divde total by 24 then take that number and for loop a pages.push with the buttons
    //invoke in search and reset
    pageNum() {
        let { count } = this.state
        let num = count / 12
        let fullNum = Math.ceil(num)
        let arr = []

        for (let i = 0; i < fullNum; i++) {
            let num = i +1
            // console.log('i', i)
                arr.push(num)            
        }
        this.setState({ pages: arr })
    }

    mapSearch() {
        //start wiht map
        return this.state.otherUsers.map((ele, i) => {
            // then if(ele.not_frineds = true){map with add friend}else{map with delete friend}
            return (
                <div className='userDiv' key={i}>
                    <div className='searchUser'>
                    <img className='userPic' src={`https://robohash.org/${ele.userid}.png?set=set4`} alt='randomly generated kitten acting as another users profile picture' />
                        <div className='searchNames'>
                        <p className='userName'>{ele.first_name}</p>
                        <p className='userName'>{ele.last_name}</p>
                        </div>
                    </div>
                    {/* build out put req for button */}
                    {ele.not_friends === true
                        ? <button className='addBtn' onClick={() => this.addFriend(i, ele.userid)}>Add Friend</button>
                        : <button className='removeBtn' onClick={() => this.removeFriend(i, ele.userid)}>Remove Friend</button>}
                </div>
            )
        })
    }

    //if search toggle is true take the input value from the box and from the input and make those the params
    render() {
        // console.log(this.state.pages)
        let totalPages = this.state.pages.map((ele, i) => {
            if (this.state.currentPage === ele) {
                return <button onClick={() => { this.search(ele, i), this.setState({currentPage: ele, currentIndex: i}) }} className='btnActive' key={i}>Page {ele}</button>
            } else {
                // console.log('map', ele, i)
                return <button onClick={() => { this.search(ele, i), this.setState({currentPage: ele, currentIndex: i}) }} className='btnInert' key={i}>{ele}</button>
            }
        })
        return (
            <div className='searchBod'>
                <div className='fullSearch'>
                    <div className='searchHead'>
                        <div>
                            <select className='searchSelect' onChange={e => this.setState({ selectVal: e.target.value })}>
                                {/* 9 options */}
                                <option value='null'>Select</option>
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
                        <input className='searchInput' onChange={(e) => this.setState({ searchName: e.target.value })} value={this.state.searchName}></input>
                        {/* set up search method then invoke */}
                        <button className='searchBtn' onClick={() => this.search(this.state.currentPage, this.state.currentIndex)}>Search</button>
                        {/* display all friends again */}
                        <button className='resetBtn' onClick={() => {this.reset(0)}}>Reset</button>
                    </div>
                        <div className='searchMain'>
                        {/* {this.mapAllNots()} */}
                        {this.mapSearch()}
                        </div>
                    <div className='searchPages'>
                        {totalPages}
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, { updateUserid })(Search)