import { render } from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux' 
import { browserHistory } from 'react-router'
import Immutable from 'immutable'
//IE10等polyfill
import polyfill from 'src/common/polyfill'
//公共方法||类载入，用window对象访问
import global from 'r2/global'
import configureStore from './store'
import container from './container'

const initialState = Immutable.Map();
const store = configureStore(initialState,browserHistory);
var history = syncHistoryWithStore(browserHistory, store,{
  selectLocationState (state) {
    return state.get('routing').toJS();
  } 
})

function renderApp(Container) {
  const target = document.getElementById('app_container');
  if (target) {
    render(
      <Container store={store} history={history} />,
      target
    );
  }
}

renderApp(container);

if (module.hot) {
  module.hot.accept(
    './container',
    () => renderApp(require('./container'))
  );
}
