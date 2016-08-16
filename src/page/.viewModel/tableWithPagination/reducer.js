import * as actionCreator from './action' 
import Immutable from 'immutable'

export function tableWithPagination(state = {}, action) {
    switch (action.type) {
		case actionCreator.REQUEST: 
			return r2fn.imutableReducer(state,action);
		case actionCreator.RECIEVE:
			return r2fn.imutableReducer(state,action,()=>{
				if(action.main){
					action.main.result.data.size = actionCreator.size;
				}
			});
        default:
			return state;
    }
}

