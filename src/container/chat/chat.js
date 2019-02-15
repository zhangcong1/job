import React from 'react'
import io from 'socket.io-client';

class Chat extends React.Component{
    componentDidMount(){
        //因为跨域，所以要传入后台的地址  注意是ws协议
        const socket = io('ws://localhost:9094');
    }
    render(){
        console.log(this.props)
        return <h2>chat with:{this.props.match.params.name}</h2>
    }
}
export default Chat