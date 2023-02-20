import { USER_STATE_CHANGE, CLEAR_DATA } from '../constants';

const initialState = {
    currentUser: null
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            };
            break;
        case CLEAR_DATA:
            return initialState;
            break;
        default:
            return state;
    }
}

