import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUserid} from '../ducks/reducer'

class Search extends Component{
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
    render(){
        return(
            <div>search</div>
        )
    }
}
export default connect(null, {updateUserid})(Search)