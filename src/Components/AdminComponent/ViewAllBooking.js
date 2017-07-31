import React,{Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase'; 
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import Logout from "../logout"
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import{
BrowserRouter as Router,
Route,
Link
}from 'react-router-dom';
export default class ViewAllBooking extends Component{
constructor(props){
    super(props);
    this.state={
       All_booking:[],
       key:[]
    }


}
componentDidMount(){
     
  firebase.auth().onAuthStateChanged(() => {
    if(firebase.auth().currentUser){

  var userId = firebase.auth().currentUser.uid;
   console.log("User Id"+userId)
    const rootRef= firebase.database().ref();
   firebase. database().ref('Booking/').on('value',snap => {
             let endTime,
                  startTime,
                  SlotNo,
                  LocationId,
                  date,
                  loc_name
              var record=snap.val()
              var key=Object.keys(record);
              let all_user=[]
        
            for (let i=0;i<key.length;i++){
                 let k=key[i]
                 all_user.push({
                   date:record[k].date,
                   endTime:record[k].EndTime,
                   startTime:record[k].StartTime,
                   SlotNo:record[k].SlotNo,
                   LocationId:record[k].locationId,
                   loc_name:record[k].LocationName
                 })
             }
              this.setState({
                All_booking:all_user
              })
          })
       }
  })
}
render(){
    return(
            <div>           
              <MuiThemeProvider>
                  <div>
                    <h3>All Bookings</h3>
                      { this.state.All_booking.map((item, index) => (
                       <div>
                    <Paper style={style} zDepth={4} rounded={false} id="abc" >
                     <p> Date : {item.date}</p>
                     <p>Start Time: {item.startTime}</p>
                     <p> End Time : {item.endTime} </p>
                     <p>Slot No. :{item.SlotNo} </p>
                     <p>Location Name :{item.loc_name} </p>
                    </Paper>
                       </div>
                     ))}
                            
                </div>
            </MuiThemeProvider>
         </div>
  
  )}
}
const style = {
  width:1000,
  margin:5,
  display: 'inline-block',
};

