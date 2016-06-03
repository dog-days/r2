import * as actionCreator from './action' 

export function generator(state = {}, action) {
    switch (action.type) {
		case actionCreator.REQUESTCREATOR: 
		case actionCreator.RECIEVECREATOR: 
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

export function generatorForm(state = {}, action){
	switch(action.type){
		case actionCreator.INPUTMODULEIDCREATOR:
			return Object.assign({}, state,action);
		default:
			return state;
	}
	
}
