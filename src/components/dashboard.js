//build out redux for user validation
//add comp did mount to each pg
import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUserid} from '../ducks/reducer'

class Dashboard extends Component{
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/userData')
            .then(res => {
                this.props.updateUserid(res)
            }).catch(err => {
                this.props.history.push('/')
            })
        }
    }
    render(){
        return(
            <div>
                <div>
                    <div>
                        {/* <img src=`https://robohash.org/${this.props.userid}?set=set4.png` alt='randomly generated kitten acting as a profile picture'/> */}
                    </div>
                    <div></div>
                </div>
                <div></div>
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

export default connect(mapStateToProps, {updateUserid})(Dashboard)