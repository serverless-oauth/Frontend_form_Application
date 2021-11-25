import React,{ Component } from 'react';
import axios from 'axios';
import './Update.css';
import Navbar from '../Navbar/Navbar';

export default class Update extends Component {

    constructor(props) {
        super(props);
        this.state = {
          firstname: '',
          lastname: '',
          email: '',
          teamname: '',
          dateofbirth: '',
          errors : {},
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.formValidation = this.formValidation.bind(this);
        //this.state = { user: this.props.user };
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
        let { firstname, lastname, teamname, dateofbirth} = this.state;
        let errors = {};
        let isValid = true;
        //const { firstname, lastname, email, teamname, dateofbirth } = this.state;
        if (!firstname) {
          isValid = false;
          errors["firstname"] = "Please enter your firstname.";
        }
  
        if (typeof firstname !== "undefined") {
          if (!firstname.match(/^[a-zA-Z ]*$/)) {
            isValid = false;
            errors["firstname"] = "Please enter alphabet characters only.";
          }
        }
        
        if (!lastname) {
          isValid = false;
          errors["lastname"] = "Please enter your lastname.";
        }
        if (!teamname) {
          isValid = false;
          errors["teamname"] = "Please enter your teamname.";
        }
  
        if (typeof lastname !== "undefined") {
          if (!lastname.match(/^[a-zA-Z ]*$/)) {
            isValid = false;
            errors["lastname"] = "Please enter alphabet characters only.";
          }
        }
        
        if(!dateofbirth){
          isValid=false;
          errors["dateofbirth"]="Please enter date of birth.";
        }

        this.setState({
          errors: errors
      });
      return isValid;
  }
      

       handleUpdate(event) {
        event.preventDefault();
        const { firstname, lastname, teamname, dateofbirth } = this.state;
         const isValid =this.formValidation();
          if(isValid){
         //let {id}=localStorage.getItem('ID');
         let sharedmail=localStorage.getItem("Shared Email").replace(/"/g,"");
          console.log(sharedmail);
         axios.put(
          `https://be5i45gx0b.execute-api.us-east-1.amazonaws.com/prebuild/services/${sharedmail}`,
            { 
              Firstname: `${firstname}`,
              Lastname: `${lastname}`,
              Teamname: `${teamname}`,
              DOB: `${dateofbirth}`,
    
           }
        );
        //this.setState({fields: fields});
        console.log(this.state);
        alert("User Details Updated!");
        //localStorage.setItem("isSubmitted",JSON.stringify(true));
        this.props.history.push('/userDetails');
        
      }
    }
    
       
    

    

    handleLogout=()=>{
        localStorage.removeItem("isAuthenticated");
        window.location.pathname="/";
 }
    
    render(){
        //const{firstname,lastname,email,teamname,dateofbirth,errors}=this.setState;
    return(
        <div className="update">
            <div className="Navbar">
            <Navbar />
            </div>
            <div className="registration-container">
            <h3>Update Your Details</h3>
            <form autoComplete="off">
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
                
                
                <p>Team Name</p>
                <input type="text" 
                name="teamname"  
                placeholder="Enter Team name"  
                onChange={this.handleChange}
                value={this.state.teamname}/>
               <div className="errorMsg">{this.state.errors.teamname}</div> 
                
                <p>Date of Birth</p>
                <input type="date" 
                name="dateofbirth"  
                placeholder="Enter Date of Birth"  
                onChange={this.handleChange}
                value={this.state.dateofbirth} />
                <div className="errorMsg">{this.state.errors.dateofbirth}</div>
                
                <button type="submit" onClick={this.handleUpdate}>Update</button>
                
            </form>
        </div>
        </div>

    )
    
}
}

