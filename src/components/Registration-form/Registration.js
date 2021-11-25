import React,{ useState,Component } from 'react';
import axios from 'axios';
import './Regiatration.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
          fields:{
          firstname: '',
          lastname: '',
          email: '',
          teamname: '',
          dateofbirth: '',
          password: '',},
          errors : {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.formValidation = this.formValidation.bind(this);
      }


      handleChange(event) {
        const inputValue = event.target.value;
        const stateField = event.target.name;
        this.setState({
          [stateField]: inputValue,
        });
        // console.log(this.state);
      }

      formValidation(){
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;
        //const { firstname, lastname, email, teamname, dateofbirth } = this.state;
        if (!fields["firstname"]) {
          isValid = false;
          errors["firstname"] = "Please enter your firstname.";
        }
  
        if (typeof fields["firstname"] !== "undefined") {
          if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
            isValid = false;
            errors["firstname"] = "Please enter alphabet characters only.";
          }
        }
        
        if (!fields["lastname"]) {
          isValid = false;
          errors["lastname"] = "Please enter your lastname.";
        }
        if (!fields["teamname"]) {
          isValid = false;
          errors["teamname"] = "Please enter your teamname.";
        }
  
        if (typeof fields["lastname"] !== "undefined") {
          if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
            isValid = false;
            errors["lastname"] = "Please enter alphabet characters only.";
          }
        }
        if (!fields["email"]) {
          isValid = false;
          errors["email"] = "Please enter your email-ID.";
        }
  
        if (typeof fields["email"] !== "undefined") {
          //regular expression for email validation
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(fields["email"])) {
            isValid = false;
            errors["email"] = "Please enter valid email-ID.";
          }
        }

        this.setState({
          errors: errors
      });
      return isValid;
  }
      

      async handleSubmit(event) {
        event.preventDefault();
        const { firstname, lastname, email, teamname, dateofbirth, password } = this.state;
        // const isValid =this.formValidation();
        // if(isValid){
          // let fields = {};
          //   fields["firstname"] = "";
          //   fields["lastname"] = "";
          //   fields["email"] = "";
          //   fields["teamname"] = "";
          //   fields["dateofbirth"] = "";
          //   this.setState({fields: fields});
        await axios.post(
          'https://56kjck4121.execute-api.us-east-1.amazonaws.com/prebuild/services/',
            { Firstname: `${firstname}`,
              Lastname: `${lastname}`,
              Email: `${email}`,
              Teamname: `${teamname}`,
              DOB: `${dateofbirth}`,
              Password: `${password}`,
    
           }
        );
        //this.setState({fields: fields});
        console.log(this.state);
        alert("Submitted");
        localStorage.setItem("isSubmitted",JSON.stringify(true));
        this.props.history.push('/userDetails');
        
      }

    

    handleLogout=()=>{
        localStorage.removeItem("isAuthenticated");
        window.location.pathname="/";
 }
    
    render(){
        //const{firstname,lastname,email,teamname,dateofbirth,errors}=this.setState;
    return(
        <div className="">
            <div>
            <Navbar/>
            </div>
            <div className="registration-container">
            <h3>Registration Form</h3>
            <form onSubmit={this.handleSubmit} autoComplete="off">
                <p>First Name</p>
                <input type="text" 
                name="firstname"  
                placeholder="Enter First name" 
                onChange={this.handleChange}
                value={this.state.firstname} />
                <div className="errorMsg">{this.state.errors.firstname}</div>

                <p>Last Name</p>
                <input type="text" 
                name="lastname" 
                placeholder="Enter Last name" 
                onChange={this.handleChange}
                value={this.state.lastname}/>
                <div className="errorMsg">{this.state.errors.lastname}</div>
                
                <p>Email</p>
                <input type="email" 
                name="email"  
                placeholder="Enter Email"  
                onChange={this.handleChange} 
                value={this.state.email}/>
                <div className="errorMsg">{this.state.errors.email}</div>
               
                <p>Team Name</p>
                <input type="text" 
                name="teamname"  
                placeholder="Enter Team name"  
                onChange={this.handleChange}
                value={this.state.teamname}/>
                <div className="errorMsg">{this.state.errors.teamname}</div>

                <p>Password</p>
                <input type="text" 
                name="password"  
                placeholder="Enter password" 
                onChange={this.handleChange}
                value={this.state.password} />
                <div className="errorMsg">{this.state.errors.password}</div>
                
                <p>Date of Birth</p>
                <input type="date" 
                name="dateofbirth"  
                placeholder="Enter Date of Birth"  
                onChange={this.handleChange}
                value={this.state.dateofbirth} />
                
                <button type="submit">Submit</button>
                
            </form>
        </div>
        </div>

    )
    
}
}

