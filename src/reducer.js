//合并所有redux
import { combineReducers } from 'redux'

//引入各个reducer
import { user } from './redux/user.redux'
import { userChart } from './redux/userChart.redux'

export default combineReducers({user,userChart});
