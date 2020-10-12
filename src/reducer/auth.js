import { Redirect } from 'react-router-dom';
import {LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,DELETE_SUCCESS,SENDMSG_SUCCESSFUL,ADD_CHANNEL} from '../actions/actionTypes';

const initialState={
    token: localStorage.getItem('userToken'),
    isAuthenticated: false,
    loading: false,
    user: null,
    messages:null,
    delSuc:false,
    channels:null
};

export default function auth(state=initialState,action){

    const {type,payload} = action;

    console.log("USER", payload)
    switch (type) {
        case LOGIN_SUCCESS:         
            localStorage.setItem('userToken',payload.code);
            return {
                ...state,
                loading:true,
                isAuthenticated: true,
                user:payload,
                messages:payload.messages,
                channels:payload.channels
            }

        case LOGOUT:  
        case LOGIN_FAIL:
            localStorage.removeItem('userToken');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loding: true

            }

        case SENDMSG_SUCCESSFUL:{

            if(payload){

                return {
                    ...state,
                   messages: payload.data.messages
    
                }
            }
           
        }
        case DELETE_SUCCESS :
            return{
                ...state,
                messages: payload.data.messages,
                delSuc:true
            }
        case ADD_CHANNEL:
            console.log('AddChannel:',payload);

            return{
                ...state,
                channels: payload.data.channels,

            }
        default:
            return{ ...state};
            
    }
} 