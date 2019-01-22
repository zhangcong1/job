import React from 'react';
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';

import Logo from '../../component/logo/logo';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.toRegister = this.toRegister.bind(this)
    }
    toRegister(){
        this.props.history.push('/register')
    }
    render(){
        return(
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary">登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.toRegister}>注册</Button>
                </WingBlank>
            </div>
        )

    }
}

export default Login;