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
import MyBooking from './MyBooking'
import SendFeedBack from './SendFeedBack'
import ParkingLocation from "./ParkingLocation"
import MyFeedback from './MyFeedBack'
import{
BrowserRouter as Router,
Route,
Link
}from 'react-router-dom';
export default class User extends Component{
 constructor(props) {
    super(props);
    this.state = {
      open: false,
      user_name:''
      };
  }
  handleToggle = () => this.setState({open: !this.state.open});
  handleClick(){

firebase.auth().signOut().then(() => {
  // Sign-out successful.
   console.log(" Sign-out successful.")
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
ParkingLocation(){
   this.props.history.push("/User/ParkingLocation")

}   
mybooking(){
  this.props.history.push("/User/MyBooking");
}
SendFeedBack(){
   this.props.history.push("/User/SendFeedBack");
}
MyFeedback(){
  this.props.history.push("/User/MyFeedBack");
}
render(){
    return(
            <div>
              <MuiThemeProvider>
                <div>
                      <AppBar
                          title={<span style={styles.title}>Welcome User</span>}
                          onTitleTouchTap={handleTouchTap}
                          onLeftIconButtonTouchTap={ this.handleToggle }
                          iconElementRight={<FlatButton label="Log out" onClick={(event) => this.handleClick(event)}/>}
                        />  
                 <div>
                      <Drawer open={this.state.open} >
                          <MenuItem onTouchTap={this.handleToggle.bind(this)}> X </MenuItem>
                          <MenuItem onTouchTap={this.ParkingLocation.bind(this)}>Parking Locations</MenuItem>
                          <MenuItem onTouchTap={this.mybooking.bind(this)}>My Booking </MenuItem>
                          <MenuItem onTouchTap={this.MyFeedback.bind(this)}>My Feed back</MenuItem>
                          <MenuItem onTouchTap={this.SendFeedBack.bind(this)}>Send Feedback</MenuItem>        
                      </Drawer>
             
                      </div>
                        <Route path="/User/ParkingLocation" component={ParkingLocation} />
                        <Route path="/User/MyBooking" component={MyBooking}/>
                         <Route path="/User/SendFeedBack" component={SendFeedBack}/>
                         <Route path="/User/MyFeedBack" component={MyFeedback}/>

                    </div>
             </MuiThemeProvider>
           </div>
  
  )}
}
function handleTouchTap() {
  alert('happy to have your attention !');
}
const styles = {
  title: {
    cursor: 'pointer',
  },
};
const style = {
 margin: 15,
};

