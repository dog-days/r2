import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import * as commonReducer from 'src/page/commonReducer'
import { routerReducer } from 'react-router-redux'

<!--reducer_import_begin-->
import * as ${var} from 'page/view/${dirname}/reducer'
<!--reducer_import_end-->
<!--reducer_import2_begin-->
import * as ${var} from 'frontend/view/${dirname}/reducer'
<!--reducer_import2_end-->

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
	${reducer} : ${var}.${reducer},
<!--reducer_reducer_end-->
<!--reducer_reducer_index_begin-->
	${var} : ${var}.${reducer},
<!--reducer_reducer_index_end-->
	formInput: commonReducer.formInput,
	r2Store: commonReducer.r2Store,
	r2Store2: commonReducer.r2Store2,
	routing: immutableReducer
}

export default reducer

