import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/userChart.redux'
import UserList from '../UserList/UserList'

@connect(
    state=>state.userChart,
    { getUserList }
)
class Boss extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getUserList('boss');
    }
    render(){
        return <UserList userList={this.props.userList}></UserList>
    }
}

export default Boss;