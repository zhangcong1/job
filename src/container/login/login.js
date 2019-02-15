import React from 'react';
import { Redirect } from 'react-router-dom';
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import Logo from '../../component/logo/logo';
//引入高阶组件
import HOCForm from '../../component/HOCForm/HOCForm'

//理解高阶组件    函数式编程:一个函数通过另一个函数装饰，变成另外一个函数
/*function hello() {
    console.log('hello React!')
}
function WapperHello(fn) {
    return function () {
        console.log('before');
        fn()
        console.log('after');
    }
}
hello = WapperHello(hello)
hello()*/
//高阶组件：一个组件通过一个函数装饰，变成另外一个组件，可以扩展组件功能
//高阶组件主要用途：1.扩展代理   2.反向继承
//2.写一个用来装饰组件的函数   传入一个组件，返回另外一个组件，另外一个组件包裹着传入的组件
/*//属性代理
function WapperHello(Comp) {
    //3.定义一个新组件
    class Wapper extends React.Component{
        render(){
            return (
                <div>
                    <h5>这是HOC高阶组件特有的</h5>
                    <Comp {...this.props}></Comp>
                </div>
            )
        }

    }
    return Wapper
}*/
/*//反向继承   改写生命周期
function WapperHello(Comp) {
    //3.定义一个新组件
    class Wapper extends Comp{
        componentDidMount(){
            console.log('高阶组件新增生命周期加载完成')
        }
        render(){
            return (
                <Comp/>
            )
        }

    }
    return Wapper
}*/
/*//1.定义一个组件
//高阶组件简写  其实connect就是一个高阶组件
@WapperHello
class Hello extends React.Component{
    render(){
        return <h2>hello React</h2>
    }
}*/

//改变原组件   简写用@符号
// Hello = WapperHello(Hello);

@connect(
    state=>state.user,
    { login }
)
@HOCForm
class Login extends React.Component{
    constructor(props){
        super(props)
/*        this.state={
            name:'',
            pwd:''
        }*/
        this.toRegister = this.toRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    toRegister(){
        this.props.history.push('/register')
    }
/*    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }*/
    handleLogin(){
        this.props.login(this.props.state)
    }
    render(){
        return(
            <div>
                {(this.props.registerTo&&this.props.registerTo!='/login') ? <Redirect to={this.props.registerTo}/> : null}
                {/*<Hello/>*/}
                <Logo/>
                <WingBlank>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <List>
                        <InputItem
                            onChange={v=>this.props.handleChange('name',v)}
                        >
                            用户</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=>this.props.handleChange('pwd',v)}
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