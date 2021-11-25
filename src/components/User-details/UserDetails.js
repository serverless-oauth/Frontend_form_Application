import React,{Component} from 'react';
import axios from 'axios';
import './UserDetails.css';

import Navbar from '../Navbar/Navbar';




export default class userDetails extends Component{
   constructor(props){
       super(props);
    this.state = {
        users : [],
        value : [],
        isLoading : true,
    }
    this.updateButtonHandler=this.updateButtonHandler.bind(this);
    this.deleteButtonHandler=this.deleteButtonHandler.bind(this);
}

    
   updateButtonHandler(){
       //const history=useHistory("");
       this.props.history.push('/update');
   }

   //let sharedemail=localStorage.getItem("Shared Email").replace(/"/g,"");

   deleteButtonHandler() {
    let sharedemail=localStorage.getItem("Shared Email").replace(/"/g,"");
    axios.delete(`https://be5i45gx0b.execute-api.us-east-1.amazonaws.com/prebuild/services/${sharedemail}`);
    alert("User Deleted!");
    this.props.history.push('/');
}
    
    componentDidMount() {
        this.setState({isLoading : false})
        axios.get(`https://be5i45gx0b.execute-api.us-east-1.amazonaws.com/prebuild/services/`)
          .then(res => {
              console.log(res)
            const users = res.data;
            this.setState({ users });
            const email=this.state.users.map(ems => ems.Email);
            const pass=this.state.users.map(pas => pas.Password)
            const len=this.state.users.length
            let sharedmail=localStorage.getItem("Shared Email").replace(/"/g,"");
            console.log(sharedmail);
            let sharedpassword=localStorage.getItem("Shared Password").replace(/"/g,"");
            console.log(sharedpassword);
            for(let i=0;i<len;i++){
                if(email[i]===sharedmail && pass[i]===sharedpassword)
                {
                    const e1=email[i]
                    axios.get(`https://be5i45gx0b.execute-api.us-east-1.amazonaws.com/prebuild/services/${e1}`)
                                .then(response => {
                                        const value = response.data;
                                        this.setState({ value });
                                        const email=this.state.users.Email
                                        console.log(email)
                                    })
                                    
                    break;
                }
                else
                {
                    const m="not found"
                    console.log(m)
                }
            }
            
          })
          
      }
      /*componentDidMount() {
        axios.get(`https://be5i45gx0b.execute-api.us-east-1.amazonaws.com/prebuild/services/${e1}`)
          .then(response => {
              console.log(response)
            const value = response.data;
            this.setState({ value });
            console.log(value)
            const email=this.state.users.Email
            console.log(email)
          })
      }*/
      handleLogout(){
          localStorage.removeItem("isAuthenticated");
          window.location.pathname('/');
      }

      

      render() {
          
        return (
            this.state.isLoading ? <div><h2>Your data is loading...</h2></div> : 
            <div className="userdetails-container">
                <div>
                    <Navbar/>
                </div>
                <div className="details-display">
                <h3>User Details</h3>
                <ul className="details">
                <div>
                      <p>First Name : {this.state.value.Firstname}</p>
                      <p>Last Name : {this.state.value.Lastname}</p>
                      <p>Team Name : {this.state.value.Teamname}</p>
                      <p>Date of Birth : {this.state.value.DOB}</p>
                      <p>
                          <button type="submit" onClick={this.updateButtonHandler}
                          style={{
                            "font-size": "15px",
                            "font-weight": "bold",
                            "margin": "5px 0",
                            "padding": "10px 10px",
                            "width": "40%",
                            "border-radius": "5px",
                            
                          }}
                          >Update Details</button> &nbsp;&nbsp;
                          <button type="submit" onClick={this.deleteButtonHandler}
                          style={{
                            "font-size": "15px",
                            "font-weight": "bold",
                            "margin": "5px 0",
                            "padding": "10px 10px",
                            "width": "40%",
                            "border-radius": "5px",
                            
                          }}
                          >Delete User</button>
                      </p>
                  </div>
                </ul>
                </div>
                {/* <div>
                    <button type="submit" onClick={()=>this.props.history.push('/register')}>Update</button>
                    <button type="submit">Delete</button>
                </div> */}
            </div>
          )
        
  
        /*return (
          <div className="userdetails-container">
              <div>
                  <Navbar/>
              </div>
              <div className="details-display">
              <h3>User Details</h3>
              <ul className="details">
                  
              </ul>
              </div>
              {/* <div>
                  <button type="submit" onClick={()=>this.props.history.push('/register')}>Update</button>
                  <button type="submit">Delete</button>
              </div> }
          </div>
        )*/
      }

}