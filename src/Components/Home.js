import React,{Component} from 'react'
import Login from './login'
import  '../CSS/nav.css'
import Nav from './nav'
export default class Home extends Component{
render(){
    return(
            <div>
               <div id="title">
             <h1 id="name">Real-Time Car Parking Booking</h1>
             <img id="headerImage" src="hedImage.jpg" alt="logo"/>
             </div>
                <Nav {... this.props}/>        
                <Login {... this.props}/>
            </div>
  
  )}
}
