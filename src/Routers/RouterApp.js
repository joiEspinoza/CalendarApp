import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch , Redirect } from "react-router-dom";
import { startChecking } from '../Actions/authActions';
import LoginScreen from '../Components/auth/LoginScreen';
import CalendarScreen from '../Components/calendar/CalendarScreen';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
  
///////

const RouterApp = () => 
{

    const dispatch = useDispatch();

    const { checking, logged } = useSelector( state => state.auth );


    useEffect(() => 
    {
      
        dispatch( startChecking() );

    }, [ dispatch ])
    
    

    if( checking )
    {
        <h5>.....Espere.....</h5>
    };
 

    ///

    return (

        <Router>

            <div>
     
                <Switch>

                    <PublicRoute isLoggedIn={ logged } component={ LoginScreen } exact path="/login" />

                    <PrivateRoute isLoggedIn={ logged } component={ CalendarScreen } exact path="/"  />
                    
                {/*

                    <Route component={ LoginScreen } exact path="/login" />

                    <Route component={ CalendarScreen } exact path="/"  />


                */}
                    <Redirect to="/"/>

                </Switch>

            </div>

        </Router>
    );
};

///////

export default RouterApp;
