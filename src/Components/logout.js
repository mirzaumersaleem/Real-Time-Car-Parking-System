import React,{Component} from 'react';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export default class Logout extends Component{

handleClick(event){
firebase.auth().signOut().then(() => {
  // Sign-out successful.
   console.log(" Sign-out successful.")
}).catch(function(error) {
  console.log(error);
});
this.props.history.push('/');

}
render(){
    return(
        <div id="navigation">
         
         <MuiThemeProvider>
           <div>
         <RaisedButton label="Log_Out" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
          </MuiThemeProvider>
        </div>
    );
 }
}
const style = {
 margin: 15,
};