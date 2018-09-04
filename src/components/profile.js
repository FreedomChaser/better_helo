import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUserid, updateFirstName, updateLastName, updateGender, updateHairColor, updateEyeColor, updateHobby, updateBirthDay, updateBirthMonth, updateBirthYear} from '../ducks/reducer'

class Profile extends Component{
    constructor(){
        super()

        this.state = {
            first_name: '',
            last_name: '',
            gender: '',
            hair_color: '',
            eye_color: '',
            hobby: '',
            birth_day: 0,
            birth_month: '',
            birth_year: 0,
        }
        this.createYear = this.createYear.bind(this)
        this.clearState = this.clearState.bind(this)
        this.createDay = this.createDay.bind(this)
    }
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/userData')
            .then(res => {
                console.log(res)
                this.props.updateUserid(res)
            }).catch(err => {
                this.props.history.push('/')
            })
        }        
    }

    // reset state
    clearState(){
        this.setState({
            first_name: '',
            last_name: '',
            gender: 'Other',
            hair_color: 'Brown',
            eye_color: 'Brown',
            hobby: 'Video Games',
            birth_day: 1,
            birth_month: 'January',
            birth_year: 1980,
        })   
    }
    updateUser(){
        if(!this.state.birth_day && !this.state.birth_month && !this.state.birth_year){
            alert('must fill out complete birthday to update profile')
        }else{
            axios.post('/api/updateUser', {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                gender: this.state.gender,
                hair_color: this.state.hair_color,
                eye_color: this.state.eye_color,
                hobby: this.state.hobby,
                birth_day: this.state.birth_day,
                birth_month: this.state.birth_month,
                birth_year: this.state.birth_year
       }).then(alert('user updated'))
        } 
    }

    createYear(){
        let yearArr = []
        let year = 1980
        for(let i=1950; i < 2018; i++){
            year++
            yearArr.push(<option value={`${year}`}> {year} </option>)
            
        }
        return yearArr
    }

    createDay(){
        let dayArr = []
        let day = 0

        for(let i=0; i < 32; i++){
            day++
            dayArr.push(<option value={`${day}`}> {day} </option>)
        }
    }

    render(){
        return(
            <div>
                <div>
                    <img className='profilePic' src={`https://robohash.org/${this.props.userid}.png?set=set4`} alt='randomly generated kitten acting as a profile picture'/>
                    <div>
                        <h1>{this.props.first_name}</h1>
                        <h1>{this.props.last_name}</h1>
                    </div>
                {/* creat axios and/or reducer reqs for this */}
                    <button>Update</button>
                    <button onClick={this.clearState}>Cancel</button>
                </div>
                <div>
                    <div>
                        <p>First Name</p>
                        <input onChange={(e) => this.setState({first_name: e.target.value})}/>
                    </div>
                    <div>
                        <p>Last Name</p>
                        <input onChange={(e) => this.setState({last_name: e.target.value})}/>
                    </div>
                    <div>
                        <p>Gender</p>
                        <div>
                            <select onClick={(value) => this.setState({gender: value})}>
                                <option value='other'>Other</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Hair Color</p>
                        <div>
                            <select onClick={(value) => this.setState({hair_color: value})}>
                                <option value='brown'>Brown</option>
                                <option value='black'>Black</option>
                                <option value='red'>Red</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Eye Color</p>
                        <div>
                            <select onClick={(value) => this.setState({eye_color: value})}>
                                <option value='brown'>Brown</option>
                                <option value='blue'>Blue</option>
                                <option value='hazel'>Hazel</option>
                                <option value='green'>Green</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Hobby</p>
                        <div>
                            <select onClick={(value) => this.setState({hobby: value})}>
                                <option value='video games'>Video Games</option>
                                <option value='sports'>Sports</option>
                                <option value='hiking'>Hiking</option>
                                <option value='reading'>Reading</option>
                                <option value='socializing'>Socializing</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Birthday Day</p>
                        <div>
                            <select onClick={(value) => this.setState({birth_day:value})}>
                                {this.createDay()}
                                {/* <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                                <option value='11'>11</option>
                                <option value='12'>12</option>
                                <option value='13'>13</option>
                                <option value='14'>14</option>
                                <option value='15'>15</option>
                                <option value='16'>16</option>
                                <option value='17'>17</option>
                                <option value='18'>18</option>
                                <option value='19'>19</option>
                                <option value='20'>20</option>
                                <option value='21'>21</option>
                                <option value='22'>22</option>
                                <option value='23'>23</option>
                                <option value='24'>24</option>
                                <option value='25'>25</option>
                                <option value='26'>26</option>
                                <option value='27'>27</option>
                                <option value='28'>28</option>
                                <option value='29'>29</option>
                                <option value='30'>30</option>
                                <option value='31'>31</option> */}
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Birthday Month</p>
                        <div>
                            <select>
                                <option value='january'>January</option>
                                <option value='february'>February</option>
                                <option value='march'>March</option>
                                <option value='april'>April</option>
                                <option value='may'>May</option>
                                <option value='june'>June</option>
                                <option value='july'>July</option>
                                <option value='august'>August</option>
                                <option value='september'>September</option>
                                <option value='october'>October</option>
                                <option value='november'>November</option>
                                <option value='december'>December</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Birthday Year</p>
                        <div>
                            <select>
                                {this.createYear()}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(reduxState){
    const {
        userid,
        first_name,
        last_name
    } = reduxState

    return {
        userid,
        first_name,
        last_name
    }
}


export default connect(null, {updateUserid, updateFirstName, updateLastName, updateGender, updateHairColor, updateEyeColor, updateHobby, updateBirthDay, updateBirthMonth, updateBirthYear})(Profile)