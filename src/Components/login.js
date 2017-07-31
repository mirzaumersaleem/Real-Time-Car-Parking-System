import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import * as firebase from 'firebase';
import App from '../App';
import{
BrowserRouter as Router,
Route,
Link
}from 'react-router-dom';
export default class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:'',
  userId:null,
  }
 }
handleClick(event) {
firebase.auth().signInWithEmailAndPassword(this.state.username,this.state.password).then((error)=> {
  // Handle Errors here.
   var typeCheck;
    var userId = firebase.auth().currentUser.uid;
    this.setState({userId:userId})
    const rootRef= firebase.database().ref();
    const speedRef = rootRef.child('USER/'+userId);
    speedRef.on('value',snap => {
     typeCheck=snap.val().Email;
     if(typeCheck==='admin@gmail.com'){
       this.props.history.push('/Admin');
     }
   else{
      this.props.history.push('/User');
   }
    
 
})
    

}).catch((error)=>{
var errorCode = error.code;
  var errorMessage = error.message;
  console.log("err",errorCode);
   
});
  
   
  }

render() {
    return (
      <div>
        
        <MuiThemeProvider>
          <div>
              <br></br>  <br></br>   <br></br>  <br></br>   
           <TextField
             hintText="Enter your E-Mail"
             floatingLabelText="E-Mail"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Sign in" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
             
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};


























