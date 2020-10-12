import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


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
    marginLeft:'25vw',
    paddingTop:'15vw'

  },
  typo:{
    color:'white',
    padding:'1vw'
  },
  buttonLogin:{
    margin:"1vw",
    background:'radial-gradient(at 50% 100%, rgb(222 24 255 / 98%), rgb(247 213 183))',
    color:'white'
  }
}));


const Placeholder= () => {
  const classes = useStyles();
    
  
  return (
  <div className={classes.root}>

    <Grid container className={classes.TaskList} >
    <Box className={classes.Heading}> 
        <Typography variant="h6" className={classes.typo}>
                Hello I am Chatterbot!
        </Typography>

        <Typography variant="h6" className={classes.typo}>
                To use the Features of ChatterBot, Please <br></br>
                <Button className={classes.buttonLogin} variant="contained" disableElevation>
                <Link to='/'> <span  className={classes.typo}>Login Now  </span> </Link> 
                </Button>
        </Typography>
    </Box>
   

    </Grid>

  </div>
  ); 
}



export default Placeholder