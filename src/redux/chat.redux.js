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
         return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.reads&&v.tos==action.payload.userid).length}
        case MSG_RECV:
            const n = action.userid == action.payload.tos ? 1 : 0;
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
            return {...state,chatmsg:[...state.chatmsg],unread:state.unread-action.payload.num}
        default:
            return state

    }
}
function msglist(data,userid) {
    return {type:'MSG_LIST',payload:data,userid}
}
//获取聊天列表
export function getMsgList() {
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                if(res.status === 200 && res.data.code === 0){
                    console.log(res.data)
                    const userid = getState().user.uid;
                    dispatch(msglist(res.data,userid))
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
function recv_msg(msg,userid) {
    return {type:MSG_RECV,payload:msg,userid}
}
//接收消息
export function recvMsg() {
    return (dispatch,getState)=>{
        socket.on('recvmsg',(data)=>{
            console.log(data)
            const userid = getState().user.uid;
             dispatch(recv_msg(data,userid))
         })
    }
}

function msgRead({from,userid,num}) {
    return {type:MSG_READ,payload:{from,userid,num}}
}
export function readMsg(from) {
    return (dispatch,getState)=>{
        console.log(from)
        axios.post('/user/readmsg',{from})
            .then(res=>{
                const userid = getState().user.uid;
                if (res.status===200 && res.data.code===0){
                    dispatch(msgRead({userid,from,num:res.data.num}))
                }
            })
    }
}