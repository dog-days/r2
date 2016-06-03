import * as actionCreator from './action' 

export function login(state = {}, action) {
    switch (action.type) {
    	
		case actionCreator.REQUESTLOGIN: 
		case actionCreator.RECIEVELOGIN: 	
			return Object.assign({}, state,action);
		
        default:
			return state;
    }
}

export function loginForm(state = {}, action){
	switch(action.type){
		
		case actionCreator.CLEARLOGIN: 	
		case actionCreator.INPUTEMAILLOGIN:
			return Object.assign({}, state,action);
		
		case actionCreator.INPUTPASSWORDLOGIN:
			return Object.assign({}, state,action);
		
		default:
			return state;
	}
	
}
