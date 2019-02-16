import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware } from 'redux';  //引入redux
import thunk from 'redux-thunk';//引入redux-thunk中间件   action可以异步执行
import { Provider } from 'react-redux';               //引入react-redux
import {
    BrowserRouter as Router ,
    Route ,
    Link ,
    Redirect ,
    Switch
} from 'react-router-dom';   //引入路由

import 'antd-mobile/dist/antd-mobile.css';  //引入antd的css样式
import reducers from './reducer'   //引入合并的reducer
import './config';   //引入拦截器
import './index.css'  //引入样式

//引入组件
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/AuthRoute/AuthRoute';
import BossInfo from './container/boss-info/boss-info';
import GeniusInfo from './container/GeniusInfo/GeniusInfo';
import Dashboard from './component/Dashboard/Dashboard';
import Chat from './container/chat/chat'

const store = createStore(reducers,applyMiddleware(thunk));

ReactDOM.render(
    (<Provider store={store}>
        <Router>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/geniusinfo' component={GeniusInfo}/>
                    <Route path='/chat/:_id' component={Chat}/>
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        </Router>
    </Provider>),
    document.getElementById('root')
);

