import axios from 'axios'
import io from 'socket.io-client';
//因为跨域，所以要传入后台的地址  注意是ws协议
const socket = io('ws://localhost:9094');

//获取聊天列表
const MSG_LIST = 'MSG_LIST';
//接收消息
const MSG_RECV = 'MSG_RECV';
//标识已读
const MSG_READ = 'MSG_READ';

const initState = {
    users:[],
    chatmsg:[],
    unread:0
}
export function chat(state=initState,action) {
    switch (action.type){
        case MSG_LIST:
            console.log(action.payload)
         return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read).length}
        case MSG_RECV:
            console.log(action.payload)
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+1}
        case MSG_READ:
        default:
            return state

    }
}
function msglist(data) {
    return {type:'MSG_LIST',payload:data}
}
//获取聊天列表
export function getMsgList() {
    return dispatch=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                console.log(res)
                if(res.status == 200 && res.data.code ==0){
                    dispatch(msglist(res.data))
                }
            })
    }
    
}
//发送消息
export function sendMsg({from,to,msg}) {
    return dispatch=>{
        socket.emit('sendmsg',{from,to,msg})
    }
}
function recv_msg(msg) {
    return {type:MSG_RECV,payload:msg}
}
//接收消息
export function recvMsg() {
    return dispatch=>{
        socket.on('recvmsg',(data)=>{
            console.log(data)
             dispatch(recv_msg(data))
         })
    }
}