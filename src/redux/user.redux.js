
import axios from 'axios';
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";

const initState = {
    name:'',
    pwd:'',
    type:'',
    msg:'',
    isAuth:false
}
export function user(state=initState,action) {
    switch (action.type){
        case REGISTER_SUCCESS:
            return {...state,isAuth:true,...action.data}
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