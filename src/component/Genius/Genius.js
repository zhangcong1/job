import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/userChart.redux'
import UserList from '../UserList/UserList'

@connect(
    state=>state.userChart,
    { getUserList }
)
class Genius extends React.Component{
    componentDidMount(){
        this.props.getUserList('genius');
    }
    render(){
        return <UserList userList={this.props.userList} />
    }
}

export default Genius;