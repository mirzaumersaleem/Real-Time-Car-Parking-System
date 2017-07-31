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
export default class LocationDetail extends Component{
constructor(){
    super()
     var date = new Date();
        date.setHours(0,0,0,0)
        var startTime = new Date();
        var endTime = new Date(); 
        endTime.setHours((endTime.getHours()+1)) 
    this.state={
        slots:[],
        expanded: false,
        slotNumber:'',
        slot_array:[],
        location_name:[],
        location:' ',
        no_of_slots:'',
         date,
         startTime,
         endTime,
         locationId:'',
         BookingKey:[],
         date_now:''
    }
}


handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };
componentDidMount(){
    //  var uid = firebase.auth().currentUser.uid;
          
  firebase.auth().onAuthStateChanged(() => {
    if(firebase.auth().currentUser){
     var slot=[];
     var status="";
     var slotNo="";
     var locationId=this.props.location.state.key
     const rootRef= firebase.database().ref();
    const speedRef = rootRef.child('Locations/'+ locationId);
    speedRef.on('value',snap => {
    var values=snap.val();
    var local_array;
     var slot;
     var slotcount;
  
           this.state.location_name.push(values.LocationName)
           this.state.slot_array.push(values.Slot)
           this.state.slot_array= Object.keys(values.Slot).map(function (value,index) 
          {
             return [value];
          });          
          
     
      this.setState({
       location_name:this.state.location_name,
       slot_array:this.state.slot_array,
       locationId:locationId
      })
 
   })
      this.setState({
        slots:slot
     })
    }
  })
}
Book(){
   var userId=firebase.auth().currentUser.uid;
  var pushId=firebase.database().ref().push().key;
  console.log(pushId)
  if(undefined==null){
           firebase.database().ref('Booking/').push({
            UserId:userId,
            locationId:this.state.locationId,
            SlotNo:String(this.state.slotNumber),
            StartTime:String(this.state.startTime),
            EndTime:String(this.state.endTime),
            date:String(this.state.date)
 
          })

      }        



}


 CheckBooking(){

   var date = this.state.date;
    var startTime = this.state.startTime;
    startTime.setFullYear(date.getFullYear());
    startTime.setDate(date.getDate());
    startTime.setMonth(date.getMonth());
    var endTime = this.state.endTime;
    endTime.setFullYear(date.getFullYear());
    endTime.setDate(date.getDate());
    endTime.setMonth(date.getMonth());
    var count=0;
    var dateNow = String(date.getDate())+'-'+String(date.getMonth()+1)+'-'+String(date.getFullYear())
    this.setState({date_now: dateNow})
    firebase. database().ref('Booking/').orderByChild('SlotNo').equalTo(String(this.state.slotNumber)).on('value',snap => {
      const booked = snap.val();
 
      if(booked){
        
        let bookings = []
        for(let a in booked){
          bookings.push(booked[a])
        
        }
   
          for(let i=0; i< bookings.length ; i++){

            let book = bookings[i];
            let start = new Date(book.StartTime);
            let end = new Date(book.EndTime);

            if(((startTime.getTime() < start.getTime()) && (endTime.getTime() > start.getTime())) || ((startTime.getTime() < end.getTime()) && (endTime.getTime() > end.getTime()))){
              alert("Slot already booked :( try some other time" )              
            }
            else{
              count = count +1;
            }
          }
      
      }

       else{
        this.Book()
          console.log("Slot has been Booked for you ")
      }
        console.log("count "+count)
   
   })
    if (count >= 1){
       this.Book()
         console.log("Slot has been Booked for you ")
      }
count=0;

    }

render(){
    return(
            <div>           
             
              <MuiThemeProvider>
                  <div>
                     <Paper style={style} zDepth={3} rounded={false} id="abc" >
                        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                            <CardText expandable={true}>
                                <h2> Reserved Parking Slot {this.state.slotNumber}</h2>

                                     <TimePicker defaultTime={this.state.startTime}
                                        onChange={(...arg) => {this.setState({startTime: arg[1]})}
                                        }  
                                          style={{display: 'inline-block'}}
                                          floatingLabelText="Start Time" 
                                          autoOk={true}/>
                               
                                        <TimePicker defaultTime={this.state.endTime} 
                                        onChange={(...arg) => {this.setState({endTime: arg[1]})}}
                                        style={{display: 'inline-block'}} 
                                        floatingLabelText="End Time" 
                                        autoOk={true}/>
                                          {/*<p>{this.state.endTime}</p>*/}
                                        <DatePicker autoOk={true} 
                                        minDate={new Date()} 
                                        defaultDate={this.state.date}
                                        onChange={(...arg) => {this.setState({date: arg[1]})}} 
                                        style={{display: 'inline-block'}} 
                                        floatingLabelText="Select Date" />
                                                          
                           <RaisedButton label="Book later" onTouchTap={this.handleReduce} />
                          <RaisedButton label="Book" primary={true} 
                          onClick={(event) => this.CheckBooking(event)}/>
                                  
                        </CardText>
                      
                         </Card>
                     
                     { this.state.slot_array.map((item, index) => (
                       <span>
                                <RaisedButton label=  {"Slot "+item} primary={true} onTouchTap = {() => {
                                    this.setState({slotNumber:item})
                                    this.handleExpand()}} />
                       </span>
                     ))}    
                            </Paper>
       
                </div>
            </MuiThemeProvider>
         </div>
  
  )}
}
const style = {
  width:1000,
  margin:5,
  display: 'inline',
   
};

