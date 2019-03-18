import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';  //用于非路由组件使用this.props.history
import { connect } from 'react-redux';
import {loadData } from '../../redux/user.redux';

/*
*   用户是否登录
 *   用户身份是牛人还是Boss
 *   用户是否完善信息
*
* */
@withRouter
@connect(
    null,
    { loadData }
)
class AuthRoute extends React.Component{
    componentDidMount(){
        //如果本页面是登录或者注册页面，不需要判断跳转登录页面
        const publicList = ['/login','/register'];
        // console.log(this.props)
        //当前页面的地址
        const currentUrl = this.props.location.pathname;
        if(publicList.indexOf(currentUrl)>-1){
            return null;
        }
        //获取用户信息
        axios.get('/user/info').then((res)=>{
            if(res.status === 200){
                //判断用户是否登录
                if(res.data.code === 0){
                    this.props.loadData(res.data.data)
                }else{
                    //用户还未登录，跳转至login页面
                    this.props.history.push('/login')
                }
            }
        })
    }
    render(){
        return null
    }
}

export default AuthRoute;