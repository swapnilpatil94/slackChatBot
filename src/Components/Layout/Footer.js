import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
    color:'primary'
  },
  paper: {
    paddingBottom: 50,
  },
  

  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor:"rgba(179, 136, 255, 0.04)"
  },
  grow: {
    flexGrow: 1,
  },
 
  button: {
    margin: theme.spacing(1),
    width:'80%',
    // background:"linear-gradient(left, #da0050, #8e2b88)",
    color:'white',
    // background: "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)"
    // background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
    // background: "linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)",
        background: "linear-gradient(90deg, #4b6cb7 0%, #37b448 100%)"

 },
 
}));

const Footer=(props)=> {
  const classes = useStyles();

  return (
    <React.Fragment>
   
      <AppBar position="fixed"  className={classes.appBar}>
        <Toolbar>
        <Grid item xs={12} sm={4}>
            <Button className={classes.button} variant="contained"  onClick={props.handleSendMsg} > 
            Send message 
            </Button>
        </Grid> 

      <Grid item xs={12} sm={4}>
        <Button className={classes.button}  variant="contained"    onClick={props.handleScheduleMsg} >
          Schedule message
        </Button>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Button className={classes.button}  variant="contained"    onClick={props.handleAddChannel} >
          Add Channel
        </Button>
      </Grid>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Footer;