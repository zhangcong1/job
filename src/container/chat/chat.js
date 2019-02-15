import React from 'react'
import io from 'socket.io-client';
import {List,InputItem} from 'antd-mobile'
//因为跨域，所以要传入后台的地址  注意是ws协议
const socket = io('ws://localhost:9094');
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            msg:[]
        }
    }
    componentDidMount(){
        socket.on('recvmsg',(data)=>{
            this.setState({
                msg:[...this.state.msg,data.text]
            })
        })
    }
    handleChange(v){
        this.setState({
            text:v
        })
    }
    handleSubmit(){
        //发送
        socket.emit('sendmsg',{text:this.state.text})
        this.setState({
            text:''
        })
    }
    render(){
        console.log(this.props)
        return (
            <div>
                {this.state.msg.map(v=>(<p key={v}>{v}</p>))}
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