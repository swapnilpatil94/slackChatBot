import axios from 'axios';
import {LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from './actionTypes';

export const login = (data) => async dispatch => {

    try {
        if(data){
            const res = await axios.post('https://django-slack-bot.herokuapp.com/events/auth/',{code:data});
  
            if(res){
                console.log('yash')
             return dispatch({
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



// // load User 
// export const loadUser = (data) => async dispatch => {
//     try {
//         const res = await axios.post('https://django-slack-bot.herokuapp.com/events/auth/',{code:data});
  
//     if(res){
//      return dispatch({
//             type: LOGIN_SUCCESS,
//            payload: res.data
//         } )
//      }
    
//     } catch (err) {
//         dispatch({
//             type: LOGIN_FAIL
//         });
//     }
// }


export const logOut = (dispatch)=>{
    dispatch({
        type: LOGOUT
    });
}