import React from 'react'
import io from 'socket.io-client';
import {List,InputItem,NavBar,Icon } from 'antd-mobile'
import {connect } from 'react-redux'
import { getMsgList,sendMsg,recvMsg } from '../../redux/chat.redux'
//因为跨域，所以要传入后台的地址  注意是ws协议
const socket = io('ws://localhost:9094');
const Item = List.Item;

@connect(
    state=>state,
    { getMsgList,sendMsg,recvMsg }
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            msg:[]
        }
    }
    componentDidMount(){
        /*socket.on('recvmsg',(data)=>{
            this.setState({
                msg:[...this.state.msg,data.text]
            })
        })*/
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }

    }
    handleChange(v){
        this.setState({
            text:v
        })
    }
    handleSubmit(){
        //发送
        // socket.emit('sendmsg',{text:this.state.text})
        const from = this.props.user._id;
        const to = this.props.match.params._id;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({
            text:''
        })
    }
    render(){
        const other_id = this.props.match.params._id;
/*        if(!this.props.chat.users.length){
            return null
        }*/
        const users = this.props.chat.users;
        const from = this.props.match.params._id;
        const me = this.props.user._id;
        return (
            <div id="chat-box">
                <NavBar
                    className="fixed-header"
                    mode="dard"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >{ users[from].name}</NavBar>
                <div className="msg_box">
                    {this.props.chat.chatmsg.map(v=>(
                        other_id==v.from?
                            <Item key={v._id} thumb={users[from].head}>{v.content}</Item>
                            : <Item
                            className="chat-me"
                            key={v._id}
                            extra={<img src={users[me].head}/>}
                        >{v.content}</Item>
                    ))}
                </div>

                <List className="input-footer">
                    <InputItem
                        value={this.state.text}
                        onChange={(v)=>this.handleChange(v)}
                        placeholder="请输入"
                        extra={<span onClick={()=>this.handleSubmit()}>发送</span>}/>
                </List>
            </div>
        )
    }
}
export default Chat