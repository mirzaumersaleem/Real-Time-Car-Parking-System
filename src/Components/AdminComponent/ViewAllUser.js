import React,{Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase'; 
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Logout from "../logout"
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import CircularProgress from 'material-ui/CircularProgress';
import{
BrowserRouter as Router,
Route,
Link
}from 'react-router-dom';
export default class ViewAllUser extends Component{
 
   constructor(props) {
    super(props);
    this.state = {
      Users:[],
      };
  }

componentDidMount() {
        
  firebase.auth().onAuthStateChanged(() => {
    if(firebase.auth().currentUser){
      
    const rootRef= firebase.database().ref();
   const speedRef = rootRef.child('USER/');
   speedRef.on('value',snap => {
    var values=snap.val();
    var keys=Object.keys(values)
     var local_array;
     var slot;
     var slotcount;
    let all_users=[];
    let email=''
    let name=''
    email="admin@gmail.com"
     for(var i=0 ;i<keys.length;i++){
       var k = keys[i]
        if(values[k].Email!==email){
             all_users.push({
                 name:values[k].name,
                 email:values[k].Email
             })
        }   
                 
       }

      this.setState({
      Users:all_users
      })

   })
      }
  })
}
render(){
    return(
            <div>           
            <h3>All Users</h3>
              <MuiThemeProvider>
                  <div>
                     { this.state.Users.map((item, index) => (
                       <div>
                    <Paper style={style} zDepth={3} rounded={false} id="abc" >
                     <p> Name : {item.name}<br/> </p>
                    <p>  Email:  {item.email}<br/> </p>
                    </Paper>
                       </div>
                     ))}    
            </div>
      </MuiThemeProvider>
            </div>
  )}
}
const style = {
 margin:20,
 width:500,
  textAlign: 'center',
  display: 'inline-block',
};
