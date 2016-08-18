import * as actionCreator from '../actionCreator' 
export function formInput(state = {}, action){
	switch(action.type){
		case actionCreator.R2FORMINPUT: 	
			return Object.assign({}, state,action);
		case actionCreator.R2CLEARFORMDATA:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}

