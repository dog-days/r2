import * as actionCreator from './action' 

export function ${moduleId}(state = {}, action) {
    switch (action.type) {
    	<!--reducer_fetch_begin-->
		case actionCreator.REQUEST: 
		case actionCreator.RECIEVE: 	
			return Object.assign({}, state,action);
		<!--reducer_fetch_end-->
        default:
			return state;
    }
}

