import React from 'react';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import Logo from '../../component/logo/logo';

@connect(
    state=>state.user,
    { login }
)
class Login extends React.Component{
    constructor(props){
        super(props)
        this.toRegister = this.toRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    toRegister(){
        this.props.history.push('/register')
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        this.props.login(this.state)
    }
    render(){
        return(
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
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.toRegister}>注册</Button>
                </WingBlank>
            </div>
        )

    }
}

export default Login;