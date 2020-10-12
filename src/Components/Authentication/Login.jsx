import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SlackLogin from './SlackLogin'
import { useSnackbar } from 'notistack';
import { Box } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {login} from '../../actions/auth'


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: "#daa8a8",
    marginTop: "10vw",
    marginLeft: "25vw",
    width: "50%",
    justifyContent: "center",
      background:'radial-gradient(at 50% 100%, rgba(123, 22, 255, 0.75), rgb(15, 1, 94))',
      height:'50vh'
  },
  title: {
    display: "flex",
    margin:'0',
    color: "#eaeaea ",
    width: "100%",
    justifyContent: "center",
  },
  slackLogin:{
    justifyContent: "center",
    marginTop:"15vw",
    marginLeft:"20vw"
  },
  paperStyle:{
    justifyContent: "center",
    alignItems:'center',
    marginTop:'15vw',
    padding:'1vw'
  },
  typo:{
    color:'#4684b9'
  },
  login:{
    color:'#f9f9f9'

  }, 
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Login({isAuthenticated,loading,login,userData}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
 
  const [openLoader,setOpenLoader] = useState();
  const handleLogin =()=>{
    setOpenLoader(true)

  }

  const onSuccess = async(data) => {
    console.log(data)
    login(data)
    enqueueSnackbar('Login Successfully!',{variant:'success'})
  };

  const onFailed = () => {
    login()
    enqueueSnackbar('Login Failed, Please Try Again!',{variant:"error"})
  };

  // setTimeout(()=>{
    if(isAuthenticated){
      return <Redirect to='/main' />
    }
  // },1000)

  if(userData){
    console.log('userrData',userData)
  }


  return (
    <div style={{width:'100vw',height:'100vh',  background:'radial-gradient(at 50% 100%, rgba(123, 22, 255, 0.75), rgb(15, 1, 94))'  }}>
      <Backdrop className={classes.backdrop} open={openLoader} onClose={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={3} m={5} className={classes.title}>
        <Typography variant={"h3"} m={5}>
          {" "}
          ChatterBot{" "}
        </Typography>
      </Grid>

      <Grid container>

        {/* <Typography variant={"h6"}> Please login to use ChatterBot</Typography> */}

        <Grid item xs={6} sm={6}>
          <Box mt={3} className={classes.paperStyle}> 
          <Paper elevation={3} > 
          
          <div style={{padding:'1vw'}}>
          <Typography variant={"h5"}><WbIncandescentIcon /> Features :</Typography> 

            <Typography className={classes.typo}  variant={"subtitle1"}><CheckCircleOutlineIcon />  Send message as user/Bot</Typography> 
            <Typography className={classes.typo}  variant={"subtitle1"}> <CheckCircleOutlineIcon /> Schedule message</Typography> 
            <Typography className={classes.typo}  variant={"subtitle1"}> <CheckCircleOutlineIcon /> List of schedule message</Typography> 
            <Typography className={classes.typo}  variant={"subtitle1"}> <CheckCircleOutlineIcon /> Delete schedule message</Typography> 
            <Typography className={classes.typo}  variant={"subtitle1"}> <CheckCircleOutlineIcon /> Get the countdown of schedule message</Typography> 

          </div>
          </Paper>

          </Box>
        

        </Grid>

        <Grid item xs={6} sm={6} spacing={3}>

          <Box className={classes.slackLogin}> 
          <Typography  className={classes.login} variant={"h5"} >Login</Typography> 
          <br></br>

            <Button onClick={handleLogin}>
            <SlackLogin
            redirectUrl='http://localhost:3000/main'
            // redirectUrl= "https://django-slack-bot.herokuapp.com/events/login/"
            onFailure={onFailed}
            onSuccess={onSuccess}
            slackClientId='1405998980963.1405793023842'
            slackUserScope='chat:write'        
            />
            </Button>
          </Box>
        

        </Grid>
       
        
      </Grid>
    </div>
  );
}
const mapStateToProps = state => {
  return{
  isAuthenticated: state.auth.isAuthenticated,
  loading:state.auth.loading,
  userData :state.auth.user
}}


export default connect(mapStateToProps,{login})(Login);
