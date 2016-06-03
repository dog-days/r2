import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router,IndexRoute,browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux' 
//公共方法||类载入，用window对象访问
import global from 'r2/global'
import configureStore from './store'
import rootRoute from './routes'
import Immutable from 'immutable'

const initialState = Immutable.Map();
const store = configureStore(initialState,browserHistory);
var history = syncHistoryWithStore(browserHistory, store,{
    selectLocationState (state) {
		return state.get('routing').toJS();
    } 
})

render(
	<Provider store={store}>
		<Router history={history} routes={rootRoute} />
	</Provider>,	
	document.getElementById('app_container')
)

/*if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function() {
            // Help React Hot Loader figure out the root component instances on the page:
            return [rootInstance];
        }
    });
}*/
