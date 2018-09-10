//build out redux for user validation
//add comp did mount to each pg
import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUserid, updateFirstName, updateLastName} from '../ducks/reducer'
import {Link} from 'react-router-dom'

class Dashboard extends Component{
    constructor(){
        super()

        this.state = {
            first_name: '',
            last_name: '',
            gender: '',
            hair_color: '',
            eye_color: '',
            hobby:'',
            birth_day: 0,
            birth_month: '',
            birth_year: 2018,
            rec_friends: [],
            sortVal: ''
        }
        this.getFriends = this.getFriends.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.mapRecs = this.mapRecs.bind(this)
        this.axGet = this.axGet.bind(this)
    }
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/userData')
            .then(res => {
                console.log(res.data)
                this.props.updateUserid(res.data.userid)
                axios.get('/api/getUser')
                .then((res) => {this.setState({
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    gender: res.data.gender,
                    hair_color: res.data.hair_color,
                    eye_color: res.data.eye_color,
                    hobby: res.data.hobby,
                    birth_day: res.data.birthday,
                    birth_month: res.data.birth_month,
                    birth_year: res.data.birth_year
            })
            this.axGet()
        })
                // axios.get(`/api/reqFriends/${this.state.sortVal}`)
                // .then((res) => this.setState({rec_friends: res.data}))
            }).catch(err => {
                this.props.history.push('/')
            })
        }else{
            axios.get('/api/getUser')
                .then((res) => {this.setState({
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    gender: res.data.gender,
                    hair_color: res.data.hair_color,
                    eye_color: res.data.eye_color,
                    hobby: res.data.hobby,
                    birth_day: res.data.birthday,
                    birth_month: res.data.birth_month,
                    birth_year: res.data.birth_year
            }, 
            this.axGet()
        )
            this.props.updateFirstName(res.data.first_name)
            this.props.updateLastName(res.data.last_name)
        })
            // axios.get(`/api/reqFriends/${this.state.sortVal}`)
            //     .then((res) => this.setState({rec_friends: res.data}, this.mapRecs()))
        }
        
    }
    //step 1  of selector box process
    getFriends(val){
        //val needs to be equal to the matching key value pair from state
        this.setState({sortVal: val}, this.axGet())
        //somehow make it so this fires after state's been updated            
    }
    axGet(){
        //sort val = the key and then I need the actual value
        axios.get(`/api/reqFriends/${this.state.sortVal}/${this.state['sortVal']}`)
        //take db add it to rec_friends 
        //then (build out secondary function and invoke to) map out req friends
        .then(res => this.setState({rec_friends: res.data}, this.mapRecs()))
    }
    addFriend(i, id){
        axios.post(`/api/addFriend/${id}`)
        .then(() => this.axGet())
    //     .then((val) => axios.get(`/api/reqFriends`)
    //         //build out function to call map
    //         .then((res) => {this.setState({rec_friends: res.data}, this.mapRecs())})
    // )
    }

    mapRecs(){
        // let displayRecs = []
        if(this.rec_friends){
            // build out feture to map through array
          let displayRecs = this.rec_friends.map((ele, i) => {
             return(
             <div key={i}>
                <img className='userPic' src={`https://robohash.org/${ele.friendid}.png?set=set4`} alt='randomly generated kitten acting as another users profile picture'/>
                <div>
                    <p>{ele.first_name}</p>
                    <p>{ele.last_name}</p>
                </div>
                {/* build out put req for button */}
                <button onChange={this.addFriend(i, ele.userid)}>Add Friend</button>
             </div>
             )
         })
        }else{
            <p>No recommendations</p>
        }
    }

    render(){
        // console.log('props', this.props)
        let name = this.state.first_name || this.state.last_name ? (
            <div>
                <img className='profilePic' src={`https://robohash.org/${this.props.userid}.png?set=set4`} alt='randomly generated kitten acting as a profile picture'/>
                <div>
                <h2>{this.state.first_name}</h2>
                <h2>{this.state.last_name}</h2>
                <Link to='/profile'>
                    <button>Edit Profile</button>
                </Link>
                </div>
            </div>
        ): (
            <div>
                <img className='profilePic' src={`https://robohash.org/${this.props.userid}.png?set=set4`} alt='randomly generated kitten acting as a profile picture'/>
                <div>
                <h2>Uh-oh! Looks like we don't have a name for you yet</h2>
                <button>Edit Profile</button>
                </div>
            </div>
        )

        
        return(
            <div>
                <div>
                    {name}
                    {/* profile if/else port */}
                    <div>
                        <p>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Recommended Friends</p>
                        <div>
                            <p>Sorted by</p>
                            <div>
                                {/* on change invoke get rec friends func */}
                                <select onChange={(e) => this.getFriends(e.target.value)}>
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
                        </div>
                    </div>
                    <div>
                        {this.mapRecs()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    const {
        userid
    } = reduxState

    return {
        userid
    }
}

export default connect(mapStateToProps, {updateUserid, updateFirstName, updateLastName})(Dashboard)