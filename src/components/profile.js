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
            gender: 'Other',
            hair_color: 'Brown',
            eye_color: 'Brown',
            hobby: 'Video Games',
            birth_day: 0,
            birth_month: 'January',
            birth_year: 2018,
            firstInput: '',
            lastInput: ''
        }
        this.createYear = this.createYear.bind(this)
        this.clearState = this.clearState.bind(this)
        this.createDay = this.createDay.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }
    //do an axios call to get user info set state based on info, when a change happens that state gets updates, but the rest remains what it was
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/userData')
            .then(res => {
                console.log(res)
                this.props.updateUserid(res.data.userid)
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
            birth_year: 2018,
        })
        alert('update cancelled')
        this.state.first_name='',
        this.state.last_name=''  
    }
    updateUser(){
        if(!this.state.birth_day && !this.state.birth_month && !this.state.birth_year){
            alert('must fill out complete birthday to update profile')
        }else{
            // console.log('firing')
            axios.put('/api/updateUser', {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                gender: this.state.gender,
                hair_color: this.state.hair_color,
                eye_color: this.state.eye_color,
                hobby: this.state.hobby,
                birth_day: Number(this.state.birth_day),
                birth_month: this.state.birth_month,
                birth_year: Number(this.state.birth_year)
       }).then((res) => console.log(res))
        } 
    }

    createYear(){
        let yearArr = []
        let year = 2019
        for(let i=2019; i > 1930; i--){
            year--
            yearArr.push(<option value={`${year}`}> {year} </option>)
            
        }
        return yearArr
    }

    createDay(){
        let dayArr = []
        let day = 0

        for(let i=0; i < 31; i++){
            day++
            dayArr.push(<option value={`${day}`}> {day} </option>)
        }
        return dayArr
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
                    <button onClick={this.updateUser}>Update</button>
                    <button onClick={this.clearState}>Cancel</button>
                </div>
                <div>
                    <div>
                        <p>First Name</p>
                        <input onChange={(e) => this.setState({first_name: e.target.value})} value={this.state.first_name}/>
                        {/* value={this.state.firstInput} */}
                    </div>
                    <div>
                        <p>Last Name</p>
                        <input onChange={(e) => this.setState({last_name: e.target.value})} value={this.state.last_name}/>
                        {/* value={this.state.lastInput} */}
                    </div>
                    <div>
                        <p>Gender</p>
                        <div>
                            <select onChange={(e) => this.setState({gender: e.target.value})}>
                                <option value='other'>Other</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Hair Color</p>
                        <div>
                            <select onChange={(e) => this.setState({hair_color: e.target.value})}>
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
                            <select onChange={(e) => this.setState({eye_color: e.target.value})}>
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
                            <select onChange={(e) => this.setState({hobby: e.target.value})}>
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
                            <select onChange={(e) => this.setState({birth_day: e.target.value})}>
                                {this.createDay()}                               
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Birthday Month</p>
                        <div>
                            <select onChange={(e) => this.setState({birth_month: e.target.value})}>
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
                            <select onChange={(e) => this.setState({birth_year: e.target.value})}>
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


export default connect(mapStateToProps, {updateUserid, updateFirstName, updateLastName, updateGender, updateHairColor, updateEyeColor, updateHobby, updateBirthDay, updateBirthMonth, updateBirthYear})(Profile)