import * as actionCreator from './action' 
import Immutable from 'immutable'

export function emptyPage(state = {}, action) {
    switch (action.type) {
		case actionCreator.REQUEST: 
		case actionCreator.RECIEVE:
        default:
			return state;
    }
}

