import React, { Fragment, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import SlackLogin from './SlackLogin'
import { useSnackbar } from 'notistack';
import { Box } from "@material-ui/core";

import {login} from '../../actions/auth'


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: "gray",
    marginTop: "8%",
    marginLeft: "25%",
    width: "50%",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    marginTop: "2%",
    color: "#408CAA ",
    width: "100%",
    justifyContent: "center",
  },
}));

function Login({isAuthenticated,loading,login,userData}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = async(data) => {
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
    <Fragment>
      <Grid container spacing={3} m={5} className={classes.title}>
        <Typography variant={"h3"} m={5}>
          {" "}
          ChatterBot{" "}
        </Typography>
      </Grid>

      <Grid container spacing={3} m={5} className={classes.root}>
        <Typography variant={"h4"}> Login</Typography>

        <Grid item xs={12} sm={12}>
          <Box>
            <SlackLogin
            redirectUrl='http://localhost:3000/main'
            // redirectUrl= "https://django-slack-bot.herokuapp.com/events/login/"
            onFailure={onFailed}
            onSuccess={onSuccess}
            slackClientId='1405998980963.1405793023842'
            slackUserScope='chat:write'        
            />
          </Box>
        

        </Grid>
       
        
      </Grid>
    </Fragment>
  );
}
const mapStateToProps = state => {
console.log("STATE",state)
  return{
  isAuthenticated: state.auth.isAuthenticated,
  loading:state.auth.loading,
  userData :state.auth.user
}}


export default connect(mapStateToProps,{login})(Login);
