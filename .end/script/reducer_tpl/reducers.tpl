import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { routerReducer } from 'react-router-redux'

<!--reducer_import_begin-->
import { ${reducer} } from '${path}'
<!--reducer_import_end-->

var initialState = Immutable.fromJS({
    locationBeforeTransitions: null
});
var immutableReducer = function(state, action){
    if(!state){
    	state = initialState
    }
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }
    return state;
}

var reducer = {
<!--reducer_reducer_begin-->
	${reducer},
<!--reducer_reducer_end-->
	routing: immutableReducer
}

export default reducer


