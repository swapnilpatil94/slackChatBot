import {LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from '../actions/actionTypes';

const initialState={
    token: localStorage.getItem('userToken'),
    isAuthenticated: false,
    loading: true,
    user: null
};

export default function auth(state=initialState,action){
    const {type,payload} = action;

    switch (type) {
        case LOGIN_SUCCESS:         
            localStorage.setItem('userToken',payload.code);
            return {
                ...state,
                loading:false,
                isAuthenticated: true,
                user:payload
            }

        case LOGOUT:    
        case LOGIN_FAIL:
            localStorage.removeItem('userToken');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loding: false
            }
        default:
            return{ ...state};
            
    }
} 