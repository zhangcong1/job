import axios from 'axios';
import {Toast} from 'antd-mobile';

//请求拦截器
axios.interceptors.request.use(function (congig) {
    Toast.loading('加载中',0)
    return congig
})
//响应拦截器
axios.interceptors.response.use(function (congig) {
    Toast.hide();
    return congig
})