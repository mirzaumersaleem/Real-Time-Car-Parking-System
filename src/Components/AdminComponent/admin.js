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
import Logout from "../logout"
import AddParkingLocation from './AddParkingLocation'
import ParkingLocation from './ParkingLocation'
import LocationDetail from './locationDetail'
import ViewAllUser from './ViewAllUser'
import ViewAllBooking from './ViewAllBooking'
import UserFeedback from './UserFeedBack'
import{
BrowserRouter as Router,
Route,
Link
}from 'react-router-dom';
export default class Admin extends Component{
 
  constructor(props) {
    super(props);
    this.state = {
        open: false
    };
  }
 
  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});


  handleClick(event){
                firebase.auth().signOut().then(() => {
                // Sign-out successful.
                }).catch(function(error) {
                console.log(error);
                });
                this.props.history.push('/');
            }


componentDidMount(){
     
  firebase.auth().onAuthStateChanged(() => {
    if(firebase.auth().currentUser){

    }else{
      this.props.history.push('/')
    }
  })
    
  
}

AddParkingLocations(event){
  this.props.history.push("/Admin/AddParkingLocation")
} 
ParkingLocation(){
   this.props.history.push("/Admin/ParkingLocation")
}  
ViewAllUser(){
     this.props.history.push("/Admin/ViewAllUser")
} 
ViewAllBooking(){
  this.props.history.push("/Admin/ViewAllBooking")

}  
Userfeedback(){
  this.props.history.push("/Admin/UserFeedback")
}    
render(){
    return(
            <div>
              <MuiThemeProvider>
                <div>
                    
      <AppBar
    title={<span style={styles.title}>Administrator</span>}
    onLeftIconButtonTouchTap={ this.handleToggle }
    iconElementRight={<FlatButton label="Log out" onClick={(event) => this.handleClick(event)}/>}
  />
                <div>
              
   
        <Drawer open={this.state.open}>
                <MenuItem onTouchTap={this.handleToggle.bind(this)}> X </MenuItem>
                <MenuItem onTouchTap={this.AddParkingLocations.bind(this)}>Add Parking Locations</MenuItem>
                <MenuItem onTouchTap={this.ParkingLocation.bind(this)}>View parking Locations</MenuItem>
                <MenuItem onTouchTap={this.ViewAllUser.bind(this)}>View All Users</MenuItem>
                <MenuItem onTouchTap={this.ViewAllBooking.bind(this)}>View All Booking</MenuItem>
                <MenuItem onTouchTap={this.Userfeedback.bind(this)}>Users feedbacks</MenuItem>
                
        </Drawer>
             
              </div>

          <Route path="/Admin/AddParkingLocation" component={AddParkingLocation} />
          <Route path="/Admin/ParkingLocation" component={ParkingLocation} />
          <Route path="/Admin/LocationDetail" component={LocationDetail}/>
          <Route path="/Admin/ViewAllUser" component={ViewAllUser}/>
          <Route path="/Admin/ViewAllBooking" component={ViewAllBooking}/>       
          <Route path="/Admin/UserFeedback" component={UserFeedback}/>       
                </div>
                
             </MuiThemeProvider>
 
            </div>
      
  
  )}
}
const styles = {
  title: {
    cursor: 'pointer',
  },
};
const style = {
 margin: 15,
};

