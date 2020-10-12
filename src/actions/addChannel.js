import axios from 'axios';
import {ADD_CHANNEL} from './actionTypes';


export const AddChannel = (data) => async (dispatch) => {

    try {
        const body={
            "name": data.channel,
            "user_token":localStorage.getItem('userToken'),
        }

        const res= await axios.post("https://django-slack-bot.herokuapp.com/events/channels/",body);
          
        if(res){
            dispatch({
                type: ADD_CHANNEL,
                payload:res
            })
        }

    } catch (error) {
        console.log("errr ->", error);
    }

};

