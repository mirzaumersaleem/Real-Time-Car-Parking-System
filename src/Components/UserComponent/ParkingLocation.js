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
export default class ParkingLocation extends Component{
 
   constructor(props) {
    super(props);
    this.state = {
       start_time: null,
       end_time:null,
       controlledDate: null,
       slot_array:[],
       location_name:[],
       location:' ',
       key:[]
      };
  }

MakeButton =() =>{
        return (
            
            this.state.location_name.map((item, index) => {
                return <p key={index} >
                   {item}<button > Book your Slot </button>        
              </p>
            }
            )
        )
    }
componentDidMount() {
   
  // const s_time= new Date(this.state.start_time);
  // var hours=s_time.getHours();
  // console.log("hours : "+hours)

    const rootRef= firebase.database().ref();
   const speedRef = rootRef.child('Locations/');
   speedRef.on('value',snap => {
    var values=snap.val();
    var keys=Object.keys(values)
     var local_array;
     var slot;
     var slotcount;
     for(var i=0 ;i<keys.length;i++){
       var k = keys[i]
           this.state.location_name.push(values[k].LocationName)
           this.state.slot_array.push(values[k].Slot)
           this.state.slot_array= Object.keys(values[k].Slot).map(function (value,index) 
          {
            
             return [value];
          });          
          }
       console.log("y slot ki vaues hain : "+this.state.slot_array);
      this.setState({
       location_name:this.state.location_name,
       slot_array:this.state.slot_array,
       key:keys
      })
      console.log("y lai beta "+this.state.location_name)
   })
}
render(){
    return(
            <div>           
            <h3>Available Parking Areas</h3>
              <MuiThemeProvider>
                  <div>
                     { this.state.location_name.map((item, index) => (
                       <div>
                    <Paper style={style} zDepth={3} rounded={false} id="abc" >
                     <h3>  {item}<br/> 
                     </h3>
                     <Link
                             to={{
                                    pathname:'/User/LocationDetail',
                                    state: {key: this.state.key[index]}
                                   }
                                   } >
                                  <RaisedButton label="View Slot" primary={true} /></Link>
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
