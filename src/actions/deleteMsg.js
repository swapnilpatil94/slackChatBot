import axios from 'axios';
import {DELETE_SUCCESS} from './actionTypes';
export const deleteMsg = (data) => async dispatch => {

    console.log('Conne',data)
    try {
        if(data){

            const body ={
                "id":data.id,
                "channel_id":data.channel_id,
                "user_token":localStorage.getItem('userToken')
            }
            const res = await axios.post('https://django-slack-bot.herokuapp.com/events/deletemessage/',body);
     
            if(res){

             dispatch({
                    type: DELETE_SUCCESS,
                    payload: res
                } )
            
            }
        }
        
    } catch (error) {
     
        
    }

};


