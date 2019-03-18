import React from 'react';
import { NavBar, TabBar } from 'antd-mobile'
import {connect} from 'react-redux'
import { Switch,Route} from 'react-router-dom'
import NavLinkBar from '../Navlink/Navlink'
import Genius from '../Genius/Genius'
import Boss from '../Boss/Boss'
import Me from '../Me/Me'
import Msg from '../Msg/Msg'
import { getMsgList,recvMsg } from '../../redux/chat.redux'



@connect(
    state=>state,
    { getMsgList,recvMsg }
)
class Dashboard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    render(){
        const user = this.props.user;
        const {pathname} = this.props.location;
        const NavList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Genius,
                hide:user.types === 'genius'
            },
            {
                path:'/genius',
                text:'Boss',
                icon:'boss',
                title:'Boss列表',
                component:Boss,
                hide:user.types === 'boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
            },
            {
                path:'/me',
                text:'我的',
                icon:'me',
                title:'个人中心',
                component:Me
            }
        ]
        const tabBarStyle={
            position:'fixed',
            width:'100%',
            bottom:0,
            zIndex:-1
        }
        return (
            <div>
                <NavBar
                    mode="dard"
                    className="fixed-header"
                >{NavList.map(v=>{
                    if (v.path===pathname){
                        return v.title
                    }
                })}</NavBar>
                <div className="msg_box">
                    <Switch>
                        {NavList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component} />
                        ))}
                    </Switch>
                </div>
                <div style={tabBarStyle}><NavLinkBar data={NavList} /></div>
            </div>
        )
    }
}


export default Dashboard