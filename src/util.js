
//判断注册以后跳转的页面
export function getRigisterTo(type,head) {
    //用户身份   '/boss'   '/genius'
    //是否完善信息  '/bossinfo'   '/geniusinfo'
    let url = type==='boss' ? '/boss' : '/genius';
    if(!head){
        url+='info';
    }
    return url;
}