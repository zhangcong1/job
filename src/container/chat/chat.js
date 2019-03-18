import React from 'react'
import io from 'socket.io-client';
import {List,InputItem,NavBar,Icon } from 'antd-mobile'
import {connect } from 'react-redux'
import { getMsgList,sendMsg,recvMsg,readMsg } from '../../redux/chat.redux'
import { getChartId } from '../../util'
//因为跨域，所以要传入后台的地址  注意是ws协议
const socket = io('ws://localhost:9094');
const Item = List.Item;


@connect(
    state=>state,
    { getMsgList,sendMsg,recvMsg,readMsg }
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
        /*let flag=false;
        if (flag){
            if(!this.props.chat.chatmsg.length){
                this.props.getMsgList();
                this.props.recvMsg();
            }
        }
        flag=true;*/
        const to = this.props.match.params._id
        this.props.readMsg(to)

    }
    handleChange(v){
        this.setState({
            text:v
        })
    }
    handleSubmit(){
        //发送
        // socket.emit('sendmsg',{text:this.state.text})
        const from = this.props.user.uid;
        const to = this.props.match.params._id;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({
            text:''
        })
    }
    render(){
        const other_id = this.props.match.params._id;
        /*if(!this.props.chat.users.length){
            return null
        }*/
        const users = this.props.chat.users;
        const from = this.props.match.params._id;
        const me = this.props.user.uid;
        const chatid = getChartId(from,me);
        const chatmsg = this.props.chat.chatmsg.filter(v=>(v.chatid === chatid));
        return (
            <div id="chat-box">
                <NavBar
                    className="fixed-header"
                    mode="dard"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >{users.length!==0?users[from].name:null}</NavBar>
                <div className="msg_box">
                    {chatmsg.map(v=>(
                        other_id == v.froms?
                            <Item key={v.cid} thumb={users[from].head}>{v.content}</Item>
                            : <Item
                            className="chat-me"
                            key={v.cid}
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