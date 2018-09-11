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
                this.props.updateFirstName(res.data.first_name)
                this.props.updateLastName(res.data.last_name)
                this.props.updateGender(res.data.gender)
                this.props.updateHairColor(res.data.hair_color)
                this.props.updateEyeColor(res.data.eye_color)
                this.props.updateHobby(res.data.hobby)
                this.props.updateBirthDay(res.data.birth_day)
                this.props.updateBirthMonth(res.data.birth_month)
                this.props.updateBirthYear(res.data.birth_year)
            })  
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
        })
                this.props.updateFirstName(res.data.first_name)
                this.props.updateLastName(res.data.last_name)
                this.props.updateGender(res.data.gender)
                this.props.updateHairColor(res.data.hair_color)
                this.props.updateEyeColor(res.data.eye_color)
                this.props.updateHobby(res.data.hobby)
                this.props.updateBirthDay(res.data.birth_day)
                this.props.updateBirthMonth(res.data.birth_month)
                this.props.updateBirthYear(res.data.birth_year)
    })  
    }     
    }

    // reset state add reducer actionbuilders to update button
    clearState(){
        this.setState({
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            gender: this.props.gender,
            hair_color: this.props.hair_color,
            eye_color: this.props.eye_color,
            hobby: this.props.hobby,
            birth_day: this.props.birth_day,
            birth_month: this.props.birth_month,
            birth_year: this.props.birth_year,
        })
        // alert('update cancelled')
        this.state.first_name=this.props.first_name,
        this.state.last_name=this.props.last_name  
    }
    //fix.then to display names
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
       })
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
            this.props.updateFirstName(res.data.first_name)
            this.props.updateLastName(res.data.last_name)
            this.props.updateGender(res.data.gender)
            this.props.updateHairColor(res.data.hair_color)
            this.props.updateEyeColor(res.data.eye_color)
            this.props.updateHobby(res.data.hobby)
            this.props.updateBirthDay(res.data.birth_day)
            this.props.updateBirthMonth(res.data.birth_month)
            this.props.updateBirthYear(res.data.birth_year)
})
  
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
            <div className='proAll'>
                <div className='proHead'>

                    <div className='proUser'>
                        <img className='profilePic' src={`https://robohash.org/${this.props.userid}.png?set=set4`} alt='randomly generated kitten acting as a profile picture'/>
                        <div className='proNameDiv'>
                        <h1 className='profileName'>{this.props.first_name}</h1>
                        <h1 className='profileName'>{this.props.last_name}</h1>
                        </div>
                    </div>
                {/* creat axios and/or reducer reqs for this */}
                <div>
                    <button className='btnUpdate' onClick={this.updateUser}>Update</button>
                    <button className='btnCancel' onClick={this.clearState}>Cancel</button>
                </div>
                </div>
                <div className='proBody'>
                    <div className='proPair'>
                        <p className='profileTitle'>First Name</p>
                        <input className='proInput' onChange={(e) => this.setState({first_name: e.target.value})} value={this.state.first_name}/>
                        {/* value={this.state.firstInput} */}
                    </div>
                    <div className='proPair'>
                        <p className='profileTitle'>Last Name</p>
                        <input className='proInput' onChange={(e) => this.setState({last_name: e.target.value})} value={this.state.last_name}/>
                        {/* value={this.state.lastInput} */}
                    </div>
                    <div className='proPair'>
                        <p className='profileTitle'>Gender</p>
                        <div>
                            <select className='proSelect' value={this.state.gender} onChange={(e) => this.setState({gender: e.target.value})}>
                                <option value='other'>Other</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>
                    </div>
                    <div className='proPair'>
                        <p className='profileTitle'>Hair Color</p>
                        <div>
                            <select className='proSelect' value={this.state.hair_color} onChange={(e) => this.setState({hair_color: e.target.value})}>
                                <option value='brown'>Brown</option>
                                <option value='black'>Black</option>
                                <option value='red'>Red</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='proPair'>
                        <p className='profileTitle'>Eye Color</p>
                        <div>
                            <select className='proSelect' value={this.state.eye_color} onChange={(e) => this.setState({eye_color: e.target.value})}>
                                <option value='brown'>Brown</option>
                                <option value='blue'>Blue</option>
                                <option value='hazel'>Hazel</option>
                                <option value='green'>Green</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='proPair'>
                        <p className='profileTitle'>Hobby</p>
                        <div>
                            <select className='proSelect' value={this.state.hobby} onChange={(e) => this.setState({hobby: e.target.value})}>
                                <option value='video games'>Video Games</option>
                                <option value='sports'>Sports</option>
                                <option value='hiking'>Hiking</option>
                                <option value='reading'>Reading</option>
                                <option value='socializing'>Socializing</option>
                            </select>
                        </div>
                    </div>
                    <div className='proPair'>
                        <p className='profileTitle'>Birthday Day</p>
                        <div>
                            <select className='proSelect' value={this.state.birth_day} onChange={(e) => this.setState({birth_day: e.target.value})}>
                                {this.createDay()}                               
                            </select>
                        </div>
                    </div>
                    <div className='proPair'>
                        <p className='profileTitle'>Birthday Month</p>
                        <div>
                            <select className='proSelect' value={this.state.birth_month} onChange={(e) => this.setState({birth_month: e.target.value})}>
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
                    <div className='proPair'>
                        <p className='profileTitle'>Birthday Year</p>
                        <div>
                            <select className='proSelect' value={this.state.birth_year} onChange={(e) => this.setState({birth_year: e.target.value})}>
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
        last_name,
        gender,
        hair_color,
        eye_color,
        hobby,
        birth_day,
        birth_month,
        birth_year
    } = reduxState

    return {
        userid,
        first_name,
        last_name,
        gender,
        hair_color,
        eye_color,
        hobby,
        birth_day,
        birth_month,
        birth_year
    }
}


export default connect(mapStateToProps, {updateUserid, updateFirstName, updateLastName, updateGender, updateHairColor, updateEyeColor, updateHobby, updateBirthDay, updateBirthMonth, updateBirthYear})(Profile)