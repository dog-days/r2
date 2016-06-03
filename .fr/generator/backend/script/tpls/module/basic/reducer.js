import * as actionCreator from './action' 

export function ${moduleId}(state = {}, action) {
    switch (action.type) {
    	<!--reducer_fetch_begin-->
		case actionCreator.REQUEST${MODULEID}: 
		case actionCreator.RECIEVE${MODULEID}: 	
			return Object.assign({}, state,action);
		<!--reducer_fetch_end-->
        default:
			return state;
    }
}
<!--reducer_form_begin-->
export function ${moduleId}Form(state = {}, action){
	switch(action.type){
		<!--reducer_input_begin-->
		case actionCreator.${const}:
			return Object.assign({}, state,action);
		<!--reducer_input_end-->
		default:
			return state;
	}
	
}
<!--reducer_form_end-->