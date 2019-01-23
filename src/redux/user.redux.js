
import axios from 'axios';
import { getRigisterTo } from '../util';
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOAD_DATA = "LOAD_DATA";

const initState = {
    registerTo:'',
    name:'',
    type:'',
    msg:'',
    isAuth:false
}
export function user(state=initState,action) {
    switch (action.type){
        case REGISTER_SUCCESS:
            return {...state,msg:'',isAuth:true,registerTo:getRigisterTo(action.type,action.head),...action.data}
        case LOGIN_SUCCESS:
            return {...state,msg:'',isAuth:true,registerTo:getRigisterTo(action.type,action.head),...action.data}
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
function registerSucess(data) {
    return {type:REGISTER_SUCCESS , data:data}
}
function loginSucess(data) {
    return {type:LOGIN_SUCCESS , data:data}
}
export function loadData(userInfo) {
    return {type:LOAD_DATA , data:userInfo}
}
export function login({name,pwd}) {
    if(!name || !pwd){
        return errorMsg("信息必须填写")
    }
    return dispatch=>{
        axios.post('user/login',{name,pwd}).then(res=>{
            console.log(res)
            if(res.status == 200 && res.data.code === 0){
                dispatch(loginSucess({name,pwd}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
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
                dispatch(registerSucess({name,pwd,repeatPwd}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }


}