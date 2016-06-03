import { combineReducers } from 'redux-immutable'
import reducerSetting from ".fr/.temp/reducers"
const reducer = combineReducers(Object.assign({},reducerSetting,{
	//自定义reducer,非智能生成可以这里设置
}))
export default reducer

