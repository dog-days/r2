import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import rootRoute from './routes'


class Container extends React.Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history} routes={rootRoute} />
      </Provider>  
    );
  }
}


module.exports = Container;
