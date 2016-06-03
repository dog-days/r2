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

export function r2Store(state = {}, action){
	switch(action.type){
		case actionCreator.R2STORAGE: 	
			return Object.assign({}, state,action);
		default:
			return state;
	}
}

export function r2Store2(state = {}, action){
	switch(action.type){
		case actionCreator.R2STORAGE2: 	
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}
