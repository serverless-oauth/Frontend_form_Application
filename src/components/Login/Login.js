import React,{useState} from 'react';
import { useHistory } from 'react-router';

import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
//import Registration from '../Registration-form/Registration';
var check=1
var subcheck=0
var i=0
var email=null
var pass=null
var len=0
const Login = ()=>{
    const[mail,setMail]=useState("");
    const[pass1,setPass]=useState("");
    const[flag,setFlag]=useState(false);
    //const[isLoggedIn,setIsLoggedIn]=useState(false);
    
    const history = useHistory();
    useEffect(() => {
        axios.get(`https://be5i45gx0b.execute-api.us-east-1.amazonaws.com/prebuild/services/`)
          .then(res => {
            const users = res.data;
            email=users.map(ems => ems.Email);
            pass=users.map(pas => pas.Password)
            len=users.length
            
        })
          
      });
       
    const handleSubmit = (e)=>{
        subcheck=1
        if(subcheck===1){
            for(i=0;i<len;i++){
                console.log(subcheck)
                console.log(mail)
                console.log(pass1)
                if(email[i]===mail && pass[i]===pass1)
                {

                    check=0
                    break
                    
                }
                else
                {
                    check=1
                    
                }
            }
            
          }
            if(check!==1){
                e.preventDefault();
                console.log(check)
                localStorage.setItem("Shared Email",JSON.stringify(mail));
                localStorage.setItem("Shared Password", JSON.stringify(pass1));

        
        //componentDidMount();

        /*if(!mail || !password){
            setFlag(true);
            //setIsLoggedIn(false);
            console.log("error");
        }
        else if((password !== pass)||(mail !== email1)){
            setFlag(true);
            //setIsLoggedIn(false);
            console.log("error");
        }
        else{*/
            setFlag(false);
            //setIsLoggedIn(true);
            console.log("Successfully logged in");
            alert("Logging you in!");
            let c = localStorage.getItem("isSubmitted");
            
            // localStorage.setItem("Shared Email",JSON.stringify(mail));

            
            
           if(c){
               history.push('/userDetails');
           }
           else{
            history.push('/registration');
           }
            //localStorage.setItem("isAuthenticated","true");
            //window.location.pathname="/registration";
            if(setFlag){
                localStorage.setItem("isAuthenticated",JSON.stringify(true));
                let s=localStorage.getItem("isAuthenticated");
                console.log("true",s);
            }
            else{
                localStorage.setItem("isAuthenticated",JSON.stringify(false));
                let s=localStorage.getItem("isAuthenticated");
                console.log("false",s);
            }
        }
        else{
            alert("user not found")
        }
        
    }
    
    
    
    
    /*const handleLogout = ()=>{
        
    }*/

    

    return(
         <div className="container">
             <h3>Login Form</h3>
             <form onSubmit={handleSubmit} autoComplete="off">
                 <p>E-Mail</p>
                 <input type="email" name="email" onChange={(event) => setMail(event.target.value)} placeholder="Enter Email" />
                 <p>Password</p>
                 <input type="password" name="password" onChange={(event) => setPass(event.target.value)} placeholder="Enter Password" />
                 <p>{flag && <p style={{"color":"red","font-size":"15px"}}>Invalid credentials</p>}</p>
                 <Link to='/signUp'>If you are a new user, register here</Link><br/>
                 <button type="submit" >Login</button>
                 
             </form>
         </div>
    )
}

export default Login;