import axios from 'axios';
import {LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,SCHEDULE_MSG_LIST} from './actionTypes';
// import {msgList} from './msgList'
export const login = (data) => async dispatch => {

    try {
        if(data){
            const res = await axios.post('https://django-slack-bot.herokuapp.com/events/auth/',{code:data});
            // msgList(res.data.code);   

     
            if(res){

             dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                } )
            
            }
        }
        
    } catch (error) {
     
        dispatch({
            type: LOGIN_FAIL
        })

    }

};




export const logOut = ()=>(dispatch)=>{
    dispatch({
        type: LOGOUT
    });
}