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
import Slide from '@material-ui/core/Slide';

import moment, { isMoment } from "moment";
import {connect} from 'react-redux'
import { useSnackbar } from "notistack";
import {SendMsg} from '../../actions/sendMsg'

const ScheduleMsg= ({ open, onClose, SendMsg, categories })=> {
  const [channel, setChannel] = React.useState("channel");
  const [msg, setMsg] = React.useState("");
  const [dateTime, setDateTime] = React.useState(moment(Date()).format("DD-MM-YYYY HH:mm:ss"));
  const [userBotOption,setUserBotOption]= React.useState('Select option to send');

  const formData = {
    msg: "",
    channel: "",
    accept_as: "",
    time:""
  };
  const [sendMsgForm, setSendMsgForm] = React.useState({
    ...formData,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleMsgField = (e) => {
    setMsg(e.target.value);
  };

  const handleChannel = (e) => {
    setChannel(e.target.value);
  };

  const handleTimeChange = (e) => {
    setDateTime(moment(e.target.value).format("DD-MM-YYYY HH:mm:ss"));
  };

  const handleOption =(e)=>{
    setUserBotOption(e.target.value);
  }

  const handleSubmit = () => {
    if (!msg)
      return enqueueSnackbar("Please type your message", { variant: "warning" });
    if (!dateTime)
      return enqueueSnackbar("Please Select Date and Time to Notify", {
        variant: "warning",
      });
    if (channel === "channel")
      return enqueueSnackbar("Please Select channel to send msg", { variant: "warning" });
  

      let data = {
        msg: msg,
        channel: channel,
        accept_as: userBotOption,
        time:dateTime
      };
  

    setSendMsgForm({
      ...data,
    });

    SendMsg(data)
    console.log('DAAATA',data)
    
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
        <DialogTitle >Schedule Your Message</DialogTitle>

        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                margin="dense"
                name="msgField"
                label="Type your message"
                type="text"
                onChange={handleMsgField}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="time"
                label="Schedule Msg"
                type="datetime-local"
                defaultValue={moment(Date()).format("YYYY-MM-DDTHH:mm")}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={handleTimeChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel id="sendAs">Send as :</InputLabel>
              <Select
                labelId="sendAs"
                id="sendAs"
                value={userBotOption}
                name="userBotOption"
                onChange={handleOption}
              >
                
                <MenuItem value={userBotOption}> {userBotOption} </MenuItem>;
                <MenuItem value={'user'}> User</MenuItem>;
                <MenuItem value={'bot'}> Bot</MenuItem>;
              </Select>
            </Grid>


            <Grid item xs={12} sm={6}>
              <InputLabel id="channelSelect">Channel</InputLabel>
              <Select
                labelId="channelSelect"
                id="channelSelect"
                value={channel}
                name="Channel"
                onChange={handleChannel}
              >
                <MenuItem value={"channel"}>Select Channel</MenuItem>
                {
                categories ? categories.map(function (currValue) {
                  return <MenuItem value={currValue.name}> {currValue.name} </MenuItem>;
                }): ''
              }
              </Select>
            </Grid>

         
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit} variant={"contained"} color="primary">
            Schedule Message
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default connect(null,{SendMsg})(ScheduleMsg);