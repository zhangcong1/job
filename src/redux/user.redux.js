
import axios from 'axios';
import { getRigisterTo } from '../util';
const AUTH_SUCCESS = "AUTH_SUCCESS";
const LOGOUT = "LOGOUT";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";

const initState = {
    registerTo:'',
    name:'',
    type:'',
    msg:''
}
export function user(state=initState,action) {
    // console.log(action)
    switch (action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'',registerTo:getRigisterTo(action.data.type,action.data.head),...action.data}
        case LOGOUT:
            return {...initState,registerTo:'/login'}
        case LOAD_DATA:
            return {...state,...action.data}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        default:
            return state
    }
}


function errorMsg(msg){
    return { msg, type:ERROR_MSG}
}
function authSucess(obj) {
    const { pwd ,...data} = obj;
    return {type:AUTH_SUCCESS , data:data}
}
//退出登录
export function logout() {
    return {type:LOGOUT}
}
/*function loginSucess(data) {

    return {type:LOGIN_SUCCESS , data:data}
}*/
export function loadData(userInfo) {
    return {type:LOAD_DATA , data:userInfo }
}
//选择头像  完善信息
export function update(data) {
    return dispatch=>{
        axios.post('user/authInfo',data).then(res=>{
            console.log(res)
            if(res.status == 200 && res.data.code === 0){
                dispatch(authSucess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
//登录
export function login({name,pwd}) {
    if(!name || !pwd){
        return errorMsg("信息必须填写")
    }
    return dispatch=>{
        axios.post('user/login',{name,pwd}).then(res=>{
            console.log(res)
            if(res.status == 200 && res.data.code === 0){
                dispatch(authSucess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
//注册
export function register({name,pwd,repeatPwd ,type}) {
    if(!name || !pwd || !type){
        return errorMsg("信息必须填写")
    }
    if(pwd != repeatPwd){
        return errorMsg("密码不一致")
    }
    return dispatch=>{
        axios.post('user/register',{name,pwd,type}).then(res=>{
            console.log(res)
            if(res.status == 200 && res.data.code === 0){
                dispatch(authSucess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }


}