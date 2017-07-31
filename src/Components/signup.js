import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase'; 
class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      password:'',
      type:''
   }
  }


handleClick(event){
  
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).catch(function(error) {
      // Handle Errors here.
     var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
     
    }).then(()=>{
     
      var uid = firebase.auth().currentUser.uid;
      firebase.database().ref('USER'+'/'+uid).set({
      name:this.state.name,
      Email:this.state.email,
      Pass:this.state.password,
      
     });
     this.props.history.push('/')
  });

 
   
}


  render() {
    return (
   <div>
        <MuiThemeProvider>
          <div>
          <AppBar style={{ backgroundColor: '#2196F3' }} title="Register"/>
          <br></br><br></br><br></br>
           <TextField
             hintText="Enter your Full Name"
             floatingLabelText="Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
             />
           <br/>

           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            
          </div>
          
             
         </MuiThemeProvider>
           
            
      </div>
    );
  }
}

const style = {
  margin: 15,
};
export default SignUp;








