import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo';
import { List, InputItem, WhiteSpace, WingBlank, Button,Radio } from 'antd-mobile';

import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';

@connect(
    state=>state.user,
    { register }
)
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            pwd:'',
            repeatPwd:'',
            type:'genius'
        }
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.registerTo ? <Redirect to={this.props.registerTo}/> : null}
                <Logo/>
                <WingBlank>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <List>
                        <InputItem
                            onChange={v=>this.handleChange('name',v)}
                        >
                            用户</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=>this.handleChange('pwd',v)}
                        >
                            密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=>this.handleChange('repeatPwd',v)}
                        >
                            确认密码</InputItem>
                        <RadioItem
                            checked={this.state.type == 'genius'}
                            onChange={()=>this.handleChange('type','genius')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            checked={this.state.type == 'boss'}
                            onChange={()=>this.handleChange('type','boss')}
                        >
                            Boss
                        </RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>

                </WingBlank>
            </div>
        )
    }
}

export default Register;