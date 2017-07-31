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
import Logout from "../logout"
import{
BrowserRouter as Router,
Route,
Link
}from 'react-router-dom';
export default class AddParkingLocation extends Component{

AddNewLocation(){
     var uid = firebase.auth().currentUser.uid;
     var slot=[];
     var status="";
     var slotNo="";
    for(var i=0;i<this.state.no_of_slots;i++){
        slot.push({
            status:'unbooked',
            slotNo:"Slot"+i+1
         } )
     }
      firebase.database().ref('Locations/').push({
      LocationName:this.state.location_name,
      Slot:slot,
     });
}
render(){
    return(
            <div>
                <MuiThemeProvider>
                 <div>
                   <Paper style={style} zDepth={3} rounded={false} id="abc" >
                       <h4> Add New Location</h4>
    <TextField
      hintText="Location Name"
      floatingLabelText="Location"
      name="locatin"
       onChange = {(event,newValue) => this.setState({location_name:newValue})}

    />
    <TextField
      hintText="Number of Slots"
      floatingLabelText="Slots"
      type="number"
      name="slot"
       onChange = {(event,newValue) => this.setState({no_of_slots:newValue})}
    />
    
    <br />
    <RaisedButton label="Add" primary={true} 
     onClick={(event) => this.AddNewLocation(event)}/>
    
    </Paper>  
                </div>
               </MuiThemeProvider>
            </div>
      
  
  )}
}
const style = {
  height: 300,
  width: 400,
  textAlign: 'center',
  display: 'inline-block',
   
};

