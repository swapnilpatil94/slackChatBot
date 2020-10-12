import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CountdownTimer from "react-component-countdown-timer";
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import {deleteMsg} from '../../actions/deleteMsg'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom:'1vh'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  delete:{
      color:'red'
  },
  delBox:{
      marginLeft:'40%'
  }
}));

const TaskList= (props)=> {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [delData, setDelData] = React.useState();


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose =()=>{
    setOpen(false)
  }
  const handleDelete =()=>{
    props.deleteMsg(delData)
    console.log('det',delData)
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{props.msg}</Typography>
          <Typography className={classes.secondaryHeading}>
            {/* {  moment(props.countDown).format('DD-MM-YYYY HH:mm:ss').fromNow()}    */}
            Schedual at : {props.countDown}
       </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Channel:      { props.channelName} 
        </Typography> 

        <Box className={classes.delBox} onClick={()=>{
            // console.log('k',props.delKey)
            let data ={
              id :props.delKey,
              channel_id: props.channel_id
            }
          setOpen(true)
            // props.deleteMsg(data)
            setDelData(data)

        }}>
           <Button> <DeleteIcon className={classes.delete} /> </Button>
        </Box>
        </AccordionDetails>
      </Accordion>
      


      {/* Dialog */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete Message
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
         Do you really want to delete messages?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            yes
          </Button>
        </DialogActions>
      </Dialog>




    </div>
  );
}

export default connect(null,{deleteMsg})(TaskList);
