import axios from 'axios';
import {SENDMSG_SUCCESSFUL,SENDMSG_FAIL} from './actionTypes';


export const SendMsg = (data) => async (dispatch) => {
    console.log("setSendMsgSw",data)

    try {
        const body={
            "message": data.msg,
            "channel": data.channel,
            "user_token":localStorage.getItem('userToken'),
            "accept":data.accept_as,
            "time":data.time
        }

        const token = {
            "user_token":localStorage.getItem('userToken'),
        }
        const responseSend= await axios.post("https://django-slack-bot.herokuapp.com/events/message/",body);
          
        if(responseSend){
            dispatch({
                type: SENDMSG_SUCCESSFUL,
                payload:responseSend
            })
        }else{
            dispatch({
                type: SENDMSG_FAIL
            })
        }


    } catch (error) {
        console.log("errr ->", error);
    }

};

//Send Msg 

export const SendMsgNew = (data) => async (dispatch) => {
    console.log("setSendMsgSw",data)
    try {
        const body={
            "message": data.msg,
            "channel": data.channel,
            "user_token":localStorage.getItem('userToken'),
            "accept":data.accept_as,
        }

        const responseSend= await axios.post("https://django-slack-bot.herokuapp.com/events/message/",body);
            


    } catch (error) {
        console.log("errr ->", error);
    }

};

