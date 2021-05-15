import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'
import AuthService from "../services/auth.service";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(null)  
    const [currentUser, setCurrentUser] = useState(undefined);

    console.log(rest.path);

    useEffect(() => {

        VerificarToken();
    
    }, [])
  
    const VerificarToken = async () => {
        console.log('routes');
        const user = await AuthService.getCurrentUser();
    
        if (user){
          setCurrentUser(user);

          const isExpired = await AuthService.isTokenExpired(user.token);
          setIsAuthenticated(isExpired);
        }
        else{
            setIsAuthenticated(false);
        }
    }

    if(isAuthenticated === null){
      return <></>
    }
  
    return (
      <Route {...rest} render={props =>
        !isAuthenticated ? (
          <Redirect to='/login'/>
        ) : (
          <Component {...props} />
        )
      }
      />
    );
  };
  
  export default PrivateRoute;