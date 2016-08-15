import * as actionCreator from './action' 
import Immutable from 'immutable'

export function tableNoPagination(state = {}, action) {
    switch (action.type) {
		case actionCreator.REQUEST: 
			return r2fn.imutableReducer(state,action);
		case actionCreator.RECIEVE:
			return r2fn.imutableReducer(state,action);
        default:
			return state;
    }
}

