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
export default class MyBooking extends Component{
constructor(props){
    super(props);
    this.state={
       my_booking:[],
       key:[]
    }


}
componentDidMount(){
  firebase.auth().onAuthStateChanged(() => {
    if(firebase.auth().currentUser){

  var userId = firebase.auth().currentUser.uid;
   console.log("User Id"+userId)
    const rootRef= firebase.database().ref();
   firebase. database().ref('Booking/').orderByChild('UserId').equalTo(userId).on('value',snap => {
    
   var record=snap.val()
   var key=Object.keys(record);
  console.log(key)
   this.setState({
    key:key
   })
    
   console.log("Records"+record)
   var has_records=[]
   for (let a in record){
    has_records.push(record[a])
   }
   console.log(has_records)
    let endTime,
        startTime,
        slotNumber,
        date,
        loc_name
    let booking =[];    
    for (var i=0 ;i<has_records.length;i++){
     let my_booking =  has_records[i];
       if (my_booking.UserId===userId){
           booking.push({
           endTime:my_booking.EndTime,
           startTime:my_booking.StartTime,
           date:my_booking.date,
           slotNumber:my_booking.SlotNo,
           loc_name:my_booking.LocationName
          })
       }else{
         alert("You have no booking yet ")
       }
    }

    this.setState({
     my_booking:booking
   })
   console.log(this.state.my_booking)
    })

    }
  })
}
DeleteSlot(index){

firebase.database().ref('Booking/'+this.state.key[index]).remove();

}

render(){
    return(
            <div>           
              <MuiThemeProvider>
                  <div>
                    <h3>My Booking</h3>
                      { this.state.my_booking.map((item, index) => (
                       <div>
                    <Paper style={style} zDepth={4} rounded={false} id="abc" >
                   
                     <p> Date : {item.date}</p>
                     <p>Start Time: {item.startTime}</p>
                     <p> End Time : {item.endTime} </p>
                     <p>Slot No. :{item.slotNumber} </p>
                     <p>Location Name:{item.loc_name}</p>
                    
                   
                    <RaisedButton label="Cancel Booking" primary={true}  onClick={this.DeleteSlot.bind(this,index)}/>
                     <br/>
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

