import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase'; 
export default class SendFeedBack extends Component {
  constructor(props){
    super(props);
    this.state={
     feedBack:''
   }
  }

sendfeedback(){
     firebase.auth().onAuthStateChanged(() => {
    if(firebase.auth().currentUser){
        var userId = firebase.auth().currentUser.uid;
             var rootRef=firebase.database().ref();
            const speedRef=rootRef
            .child("Feedback/")
            .push({
              FeedBack: this.state.feedBack,
              UserId: userId
            })
    }
            })

  
}

  render() {
    return (
   <div>
        <MuiThemeProvider>
          <div>
            <br/><br/><br/>
           <TextField
             hintText="Please Enter your Feedback"
             floatingLabelText="Your FeedBack"
             onChange = {(event,newValue) => this.setState({feedBack:newValue})}
             />
           <br/>

           <RaisedButton label="Submit" primary={true} style={style} onClick={ this.sendfeedback.bind(this)}/>
            
          </div>
          
             
         </MuiThemeProvider>
           
            
      </div>
    );
  }
}

const style = {
  margin: 15,
};









