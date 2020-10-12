import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {connect} from 'react-redux'

import { useSnackbar } from "notistack";
import {SendMsgNew} from '../../actions/sendMsg'
import {AddChannel} from '../../actions/addChannel'

const AddChannelLayout =({ open, onClose, AddChannel })=> {
  const [channel, setChannel] = React.useState("channel");
 
  const formData = {
    channel: "",
  };

  const [sendMsgForm, setSendMsgForm] = React.useState({
    ...formData,
  });

  const { enqueueSnackbar } = useSnackbar();

 
  const handleChannel = (e) => {
    setChannel(e.target.value);
  };


  const handleSubmit = () => {
  
    if (!channel)
      return enqueueSnackbar("Please Add channel Name", { variant: "warning" });
  

    let data = {
      channel: channel.toLowerCase(),
    };

    setSendMsgForm({
      ...data,
    });
  
    AddChannel(data)
    enqueueSnackbar("Add Channel Successfully", { variant: "success" });

    
    onClose();
  };
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        // aria-labelledby="add-todo-title"
      >
        <DialogTitle >Create your own channel</DialogTitle>

        <DialogContent>
          <Grid container spacing={3}>
            
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                name="msgField"
                label="Type your channel name"
                type="text"
                onChange={handleChannel}
                fullWidth
              />
            </Grid>

         
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit} variant={"contained"} color="primary">
            Add Channel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}



export default connect(null,{AddChannel} )(AddChannelLayout);