/* eslint-disable no-case-declarations */
// action - state management
import * as actionTypes from './actions';

export const initialState = {
    id: "",
    name: "",
    surname: "",
    avatar: "",
    email: "",
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            const { id, name, surname, avatar, email } = action;
            return {
                ...state,
                id,
                name,
                surname,
                avatar,
                email
            };
        case actionTypes.DELETE_USER:
            return {
                ...state,
                id: "",
                name: "",
                surname: "",
                avatar: "",
                email: "",
            };
        default:
            return state;
    }
};

export default userReducer;
