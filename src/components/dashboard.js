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
            rec_friends: [],
        }
    }
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/userData')
            .then(res => {
                console.log(res.data)
                this.props.updateUserid(res.data.userid)
            }).catch(err => {
                this.props.history.push('/')
            })
        }
            axios.get('/api/getName')
            .then((res) => {this.setState({first_name: res.data[0].first_name, last_name: res.data[0].last_name})
            this.props.updateFirstName(res.data[0].first_name)
            this.props.updateLastName(res.data[0].last_name)}
        )
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
                <h2>Uh-oh! Looks like we don't have a name for you</h2>
                <button>Edit Profile</button>
                </div>
            </div>
        )  
        // if(first_name && last_name){
        //     return(
        //         <div>
        //             <img className='profilePic' src={`https://robohash.org/${this.props.userid}.png?set=set4`} alt='randomly generated kitten acting as a profile picture'/>
        //             <div>
        //             <h2>{first_name}</h2>
        //             <h2>{last_name}</h2>
        //             <button>Edit Profile</button>
        //             </div>
        //         </div>
        //     )
        // }else{
        //     return(
        //         <div>
        //             <img className='profilePic' style="width:150px" src={`https://robohash.org/${this.props.userid}.png?set=set4`} alt='randomly generated kitten acting as a profile picture'/>
        //             <div>
        //             <h2>Uh-oh! Looks like we don't have a name for you</h2>
        //             <button>Edit Profile</button>
        //             </div>
        //         </div>
        //     )
        // }

        // if(rec_friends[0]){
        //     // build out feture to map through array
        // }else{
        //     <p>No recommendations</p>
        // }
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
                        </div>
                    </div>
                    <div>
                        {/* invoke rec friends */}
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