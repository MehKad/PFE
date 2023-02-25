import { USER_STATE_CHANGE, CLEAR_DATA, USER_ANNONCE_STATE_CHANGE } from '../constants';

const initialState = {
    currentUser: null,
    annonces: []
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            };
            break;
        case USER_ANNONCE_STATE_CHANGE:
            return {
                ...state,
                annonces: action.annonces
            };
            break;
        case CLEAR_DATA:
            return initialState;
            break;
        default:
            return state;
    }
}

