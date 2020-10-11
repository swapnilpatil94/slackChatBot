import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from "@material-ui/core/Grid";
import Slide from '@material-ui/core/Slide';
import {connect} from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

import SendMsgLayout from '../Layout/SendMsg';
import ScheduleMsg from '../Layout/ScheduleMsg';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import TaskList from './TaskList';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundImage:`URL("bot.jpeg")`,
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


const Main= ({isAuthenticated,userData}) => {
  const classes = useStyles();
  const [sendMsg,setSendMsg] = useState(Boolean);
  const [scheduleMsg,setScheduleMsg] = useState(Boolean);
  const [category,setCategory] = useState();

  useEffect(()=>{
    setCategory(userData?.channels)

  },[])
  
  // setTimeout(()=>{
  //   if(!isAuthenticated){
  //     return  <Redirect to='/' />
  //  }
 
  // },2000)
  
  

  const handleSendMsg =()=>{
    setSendMsg(true)
  }

  const handleScheduleMsg =()=>{
    setScheduleMsg(true)
  }
  return (
  <div className={classes.root}>
    <Header />

    <Grid container className={classes.TaskList} >
    <Typography variant="h6" className={classes.typo}>
            Schedule Messages
          </Typography>
          {/*TaskList Map */}

    {
     userData?.messages.map((msg, index)=>{
     
     return <TaskList
              key={msg.id}
              msg={msg.text}
              channelName={msg.name} 
              countDown={msg.post_at} 
            />

     })
    }

      <Footer handleSendMsg={handleSendMsg}  handleScheduleMsg={handleScheduleMsg} />
     
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



    </Grid>

  </div>
  );
}


const mapStateToProps =state=>{
return{

    isAuthenticated: state.auth.isAuthenticated,
    loading:state.auth.loading,
    userData :state.auth.user
}
}

export default connect(mapStateToProps)(Main)