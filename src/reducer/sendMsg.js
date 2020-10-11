import {SENDMSG_SUCCESSFUL,SENDMSG_FAIL} from '../actions/actionTypes';

const initialState={
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
};

export default function auth(state=initialState,action){
    const {type,payload} = action;

    switch (type) {
        case LOGIN_SUCCESS:
            
            localStorage.setItem('userToken',payload.code);
            console.log('USERDATE',payload )

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