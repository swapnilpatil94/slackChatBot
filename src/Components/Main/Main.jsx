import React,{Fragment, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Slide from '@material-ui/core/Slide';
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from "notistack";
import { Link, Redirect } from "react-router-dom";
import SendMsgLayout from '../Layout/SendMsg';
import ScheduleMsg from '../Layout/ScheduleMsg';
import AddChannelLayout from'../Layout/AddChannel';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import TaskList from './TaskList';
import Placeholder from '../../Components/Layout/placeHolder'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background:'radial-gradient(at 50% 100%, rgba(123, 22, 255, 0.75), rgb(15, 1, 94))',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height:'100vh'
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonsLocation:{
    position:'absolute',
    top:'50%'
  },
  TaskList:{
    width:'70%',
    marginLeft:'10vw',
    marginTop:'3vw'

  },
  typo:{
    color:'white',
    padding:'1vw'
  },
}));


const Main= ({isAuthenticated,userData,messages,delSuc,channels}) => {
  const classes = useStyles();
  const [sendMsg,setSendMsg] = useState(Boolean);
  const [scheduleMsg,setScheduleMsg] = useState(Boolean);
  const [category,setCategory] = useState(channels);
  const[msgData,setMsgData]=useState(messages)
  const [addChannel,setAddChannel] =useState();
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(()=>{
  //   setCategory(userData?.channels)

  // },[])

  useEffect(()=>{
    setCategory(channels)
    console.log('setCategory',category)
  },[channels])

  useEffect(()=>{
    setMsgData(messages)
    console.log('msgDF',msgData)
  },[messages])
  
    // if(!msgData){
    //   return  <Redirect to='/' />
    // }

    // if(!isAuthenticated){
    //   alert('Please Login to use the app')
    // }
  
  if(delSuc){
    return enqueueSnackbar("Message Deleted Successfully", { variant: "success" });
  }

  const handleSendMsg =()=>{
    setSendMsg(true)
  }

  const handleScheduleMsg =()=>{
    setScheduleMsg(true)
  }

const handleAddChannel= ()=>{
    setAddChannel(true)
}
  return (
    <Fragment >
 {
   !userData ? <Placeholder /> : 

 <div className={classes.root}>
    <Header />

    <Grid container className={classes.TaskList} >
    <Typography variant="h6" className={classes.typo}>
            Schedule Messages
      </Typography>
          {/*TaskList Map */}

    {
     !(msgData===undefined) && msgData?.map((msg, index)=>{
     
     return <TaskList
              key={msg.id}
              msg={msg.text}
              channelName={msg.name} 
              countDown={msg.post_at} 
              delKey= {msg.id}
              channel_id={msg.channel_id}
            />

     })
    }

      <Footer handleSendMsg={handleSendMsg} handleAddChannel={handleAddChannel}  handleScheduleMsg={handleScheduleMsg} />
     
      <Slide direction="down" timeout={4000}>

      <SendMsgLayout
          open={sendMsg}
          onClose={() => {
            setSendMsg(!sendMsg);
          }}
          // addTask={addTask}
          categories={category}
        />
      </Slide>
      <ScheduleMsg
          open={scheduleMsg}
          onClose={() => {
            setScheduleMsg(!scheduleMsg);
          }}
          // addTask={addTask}
          categories={category}
        />

        <AddChannelLayout
          open={addChannel}
          onClose={() => {
            setAddChannel(!addChannel);
          }}
          // addTask={addTask}
        />


    </Grid>

  </div>
 
 
 
}
</Fragment>
); 
}


const mapStateToProps =state=>{
return{

    isAuthenticated: state.auth.isAuthenticated,
    loading:state.auth.loading,
    userData :state.auth.user,
    messages:state.auth.messages,
    channels:state.auth.channels
}
}

export default connect(mapStateToProps)(Main)