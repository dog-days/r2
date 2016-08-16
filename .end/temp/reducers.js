import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { routerReducer } from 'react-router-redux'


import { about } from 'src/page/view/about/reducer.js'

import { login } from 'src/page/view/login/reducer.js'

import { loginForm } from 'src/page/view/login/reducer.js'


const initialState = Immutable.fromJS({
    locationBeforeTransitions: null
});
var immutableReducer = function(state = initialState, action){
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }
    return state;
}

let reducer = {

	about,

	login,

	loginForm,

	routing: immutableReducer
}

export default reducer

