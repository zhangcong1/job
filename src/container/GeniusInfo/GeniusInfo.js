import React from 'react';
import { Redirect } from 'react-router-dom';
import {NavBar, Icon, List, InputItem, WhiteSpace, WingBlank, Button, TextareaItem} from 'antd-mobile';
import HeadSelect from '../../component/HeadSelect/HeadSelect';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux'
@connect(
    state=>state.user,
    { update }
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            head:'',
            company:'',
            money:'',
            desc:''
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleUpdate(){
        this.props.update(this.state)
        console.log(this.state)
    }
    render(){
        const locationPage = this.props.location.pathname;
        const registerTo = this.props.registerTo;
        return (
            <div>
                {registerTo && registerTo!==locationPage ? <Redirect to={this.props.registerTo}/> : null}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                >牛人信息</NavBar>
                <WingBlank>
                    <HeadSelect HeadSelect= {(v)=>{
                        this.setState({
                            head:v
                        })
                    }}/>
                    <List>
                        <InputItem
                            onChange={v=>this.handleChange('title',v)}
                        >
                            求职岗位</InputItem>
                        <TextareaItem
                            title="个人简介"
                            autoHeight
                            rows={3}
                            onChange={v=>this.handleChange('desc',v)}
                        />
                    </List>
                    <Button type="primary" onClick={this.handleUpdate}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}
export default GeniusInfo;