import React,{ useState } from 'react';
//import Login from './Login/Login';

const Register = ()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    
    const[flag,setFlag]=useState(false);
    const[login,setLogin]=useState(true);
    //const[info,setInfo]=useState(true);

    const handleSubmit =(e)=>{
       e.preventDefault();
       if(!username || !password)
       {
           setFlag(true);
       }
       else{
           setFlag(false);
           localStorage.setItem("LoginUsername",JSON.stringify(username));
           localStorage.setItem("LoginPassword",JSON.stringify(password));
           console.log("Saved user details");
           setLogin(!login);
       }
    }
   /* const handleClick =()=>{
        setLogin(!login);
    }
    const infoClick=()=>{
        setInfo(!info);
    }*/

    return(
            <div>
                <h3>Register</h3>
                <form onSubmit={handleSubmit}>
                   <div>
                       <label>Username</label>
                       <input type="text" name="username" onChange={(event) => setUsername(event.target.value)} />
                   </div>
                   <div>
                       <label>Password</label>
                       <input type="password" name="password" onChange={(event) => setPassword(event.target.value)} />
                   </div>
                   <button type="submit">Submit</button>
                </form>
            </div>
    )
}

export default Register;