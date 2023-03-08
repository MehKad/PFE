import { USER_STATE_CHANGE, TEACHERS_STATE_CHANGE, CLEAR_DATA, USER_ANNONCE_STATE_CHANGE } from '../constants';

const initialState = {
    currentUser: null,
    annonces: [],
    teachers: []
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            };
            break;
        case TEACHERS_STATE_CHANGE:
            return {
                ...state,
                teachers: action.teachers
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

