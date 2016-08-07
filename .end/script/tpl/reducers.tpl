import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import * as commonReducer from 'src/page/commonReducer'
import { routerReducer } from 'react-router-redux'

<!--reducer_import_begin-->
import { ${reducer} } from '${path}'
<!--reducer_import_end-->

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
<!--reducer_reducer_begin-->
	${reducer},
<!--reducer_reducer_end-->
	formInput: commonReducer.formInput,
	r2Store: commonReducer.r2Store,
	r2Store2: commonReducer.r2Store2,
	routing: immutableReducer
}

export default reducer

