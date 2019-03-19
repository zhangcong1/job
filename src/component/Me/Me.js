import React from 'react'
import {connect} from 'react-redux'
import {Result,WhiteSpace ,List,Modal,Button} from 'antd-mobile'
import browserCookies from 'browser-cookies';
import {logout} from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
@connect(
    state=>state.user,
    { logout }
)
class Me extends React.Component{
    constructor(props){
        super(props)
        this.logOut = this.logOut.bind(this)
    }
    logOut(){
        const alert = Modal.alert
        alert('注销', '确定退出登录???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                browserCookies.erase('userId')
                this.props.logout();
            } },
        ])
    }
    render(){
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" style={{width:50,height:50}} alt="" />;
        const Item = List.Item;
        const Brief = Item.Brief;
        return(
            this.props.account?<div>
                <Result
                    img={myImg(this.props.heads)}
                    title={this.props.account}
                    message={this.props.company?this.props.company:null}
                />
                <List renderHeader={()=>'简介'}>
                    <Item>
                        {this.props.titles}
                        {this.props.descs.split('\n').map(v=>(
                            <Brief key={v}>{v}</Brief>
                        ))}
                        {this.props.money?<Brief>薪资：{this.props.money}</Brief>:null}
                    </Item>

                </List>
                <List>
                    <Button onClick={this.logOut}>退出登录</Button>
                </List>
            </div>:<Redirect to={this.props.registerTo}/>
        )
    }
}
export default Me;