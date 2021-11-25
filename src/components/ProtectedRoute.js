import React from "react";
import { Redirect, Route } from "react-router-dom";
//import Registration from "./Registration-form/Registration";


function ProtectedRoute({ component: Component, ...restOfProps }) {
  let isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);
  //const history=useHistory();

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ?<Component {...props}/> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
