import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from "@material-ui/core/Grid";
import Slide from '@material-ui/core/Slide';
import {connect} from 'react-redux'
import { Link, Redirect } from "react-router-dom";

import SendMsgLayout from '../Layout/SendMsg';
import ScheduleMsg from '../Layout/ScheduleMsg';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage:`URL("bot.jpeg")`,
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
  }
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

    <Grid container className={classes.buttonsLocation}  direction="column"     justify="center"  alignItems="center" >
    
      <Grid item xs={12} sm={6}>
        <Button className={classes.button} variant="contained" color="secondary" onClick={handleSendMsg} > 
          Send message
        </Button>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Button className={classes.button}  variant="contained" color="primary"   onClick={handleScheduleMsg} >
          Schedule message
        </Button>
      </Grid>


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