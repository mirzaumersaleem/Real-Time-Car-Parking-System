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
         date_now:'',
         loc_name:'',


         enable:[],
         disable:[]
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
Book(item){
   var userId=firebase.auth().currentUser.uid;
  var pushId=firebase.database().ref().push().key;
   this.state.startTime= String(this.state.startTime.getHours())+' : '+String(this.state.startTime.getMinutes())+' : '+String(this.state.startTime.getSeconds())
  this.state.endTime= String(this.state.endTime.getHours())+' : '+String(this.state.endTime.getMinutes())+' : '+String(this.state.endTime.getSeconds())
  this.state.date= String(this.state.date.getDate())+'-'+String(this.state.date.getMonth()+1)+'-'+String(this.state.date.getFullYear())
  
        this.setState({
           startTime:this.state.startTime,
           endTime:this.state.endTime,
           date:this.state.date
        }) 
  firebase. database().ref('Locations/'+this.state.locationId).on('value',snap => {
  let locobj=snap.val().LocationName
  this.setState({
     loc_name:locobj
  })
  
 })

   console.log(this.state.startTime +" End time "+this.state.endTime + " :"+this.state.date)
           firebase.database().ref('Booking/').push({
            UserId:userId,
            locationId:this.state.locationId,
            SlotNo:String(item),
            StartTime:String(this.state.startTime),
            EndTime:String(this.state.endTime),
            date:String(this.state.date),
            LocationName:String(this.state.location_name)
          })
  alert("Slot has been Booked for you")
}

CheckBooking(){

    var date = this.state.date;
    var startTime = this.state.startTime;
    var endTime = this.state.endTime;
     var sl;
    startTime= String(this.state.startTime.getHours())+' : '+String(this.state.startTime.getMinutes())+' : '+String(this.state.startTime.getSeconds())
            let split_start_time=startTime.split(":")
            let start_hours_select =split_start_time[0]
             let start_min_select=split_start_time[1]
             start_hours_select=Number(start_hours_select)
             start_min_select=Number( start_min_select) 

    endTime= String(this.state.endTime.getHours())+' : '+String(this.state.endTime.getMinutes())+' : '+String(this.state.endTime.getSeconds())
         
            let split_end_time=endTime.split(":")
            let end_hours_select=split_end_time[0]
            let end_min_select=split_end_time[1]
            end_hours_select=Number(end_hours_select)
            end_min_select=Number(end_min_select)
          
    var dateNow = String(date.getDate())+'-'+String(date.getMonth()+1)+'-'+String(date.getFullYear())
            var split_date =dateNow.split("-")
            let day_select=split_date[0]
            let month_select=split_date[1]
            let year_select =split_date[2]
       

    this.setState({date_now: dateNow})

      firebase. database().ref('Booking/').orderByChild('locationId').equalTo(String(this.state.locationId)).on('value',snap => {
      const booked = snap.val();
         let differen_location_count=0 ;
      if(booked){ 
        // alert("have some previous bookings ")
         let count=0;      
         let bookings = []
        for(let a in booked){
          bookings.push(booked[a])       
        }       
      for(let i=0; i< bookings.length ; i++){
           
            let book = bookings[i];
      
            let start = String(book.StartTime);
            var split_start_time=start.split(":")
            let start_hours =split_start_time[0]
            let start_min=split_start_time[1]
             start_hours=Number(start_hours)
             start_min=Number(start_min)

            let end = String(book.EndTime);
            let split_end_time=end.split(":")
            let end_hours=split_end_time[0]
            let end_min=split_end_time[1]
             end_hours=Number(end_hours)
             end_min=Number(end_min)
          
            let date=String(book.date)
            var split_date =date.split("-")
            let day=split_date[0]
            let month=split_date[1]
            let year =split_date[2]
         
             day=Number(day)
             month=Number(month)
             year=Number(year)

             if(day_select == day ){
              //  alert("yes day same ")
                    if (((start_hours_select < start_hours) && (end_hours_select < start_hours)) || (start_hours_select > end_hours)){
                      //  alert("ok no problem in if ")
                      console.log("book.slotNo"+this.state.enable.push(book.SlotNo))
                    }else{
                      // alert ("Similarity find i am in first else ")
                       console.log("disable book.slot no"+this.state.disable.push(book.SlotNo))
                      this.setState({disable:this.state.disable})
                    
                }                 
             }                
            //  else{
            //         if (((start_hours_select < start_hours) && (end_hours_select < start_hours)) || (start_hours_select > end_hours)){
            //           console.log("book.slotNo"+this.state.enable.push(book.SlotNo))
            //         }else{
            //             console.log("disable book.slot no"+this.state.disable.push(book.SlotNo))
            //         }  
            //     }
               }     
         }
       

               for(var i=0 ;i<this.state.slot_array.length;i++){
                  
                       var data1 = this.state.disable[i]
                        if(data1!==undefined){ 
                        console.log("data 1"+data1)
                        console.log(typeof data1)
                        data1=Number(data1)                         
                        this.state.slot_array.splice(data1,1) ;                      
                        }
             }  
 this.setState({disable:this.state.disable,enable:this.state.enable,slot_array:this.state.slot_array})
       })
    }

render(){
    return(
            <div>                     
              <MuiThemeProvider>
                  <div>
                     <Paper style={style} zDepth={3} rounded={false} id="abc" >
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
                          <RaisedButton label="Find Slot" primary={true} 
                          onTouchTap = {() => {
                                   {/*this.setState({slotNumber:item})*/}
                                   this.CheckBooking()  
                              
                                    this.handleExpand()}} />
                
                   <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                            <CardText expandable={true}>
                                    {/*{ this.state.disable.map((item, index) => (
                                      <span>                   
                                          <RaisedButton label=  {"Slot "+item} disabled={true}/>                             
                                    </span>         
                                    ))} */}
                                  { this.state.slot_array.map((item, index) => (
                                        <span>
                                            <RaisedButton label=  {"Slot "+item} primary={true} onTouchTap = {() => {
                                      
                                        this.setState({slotNumber:item})
                                        this.Book(item);
                                            this.handleExpand()}} />
                                      </span>
                                  ))} 

                                  
                        </CardText>
                      
                         </Card>
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

