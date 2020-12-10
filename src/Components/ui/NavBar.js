import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../Actions/authActions';
import { eventLogout } from '../../Actions/eventActions';

//////

const NavBar = () => 
{
    const { name } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const handleLogout = () =>
    {
        dispatch( startLogout() );
        dispatch( eventLogout() );
    };

    /////

    return (


        <div className="navbar navbar-dark bg-dark mb4">

            <span className="navbar-brand"> { name } </span>

            <button onClick={ handleLogout } className="btn btn-outline-danger">
                
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir </span>
                
            </button>

        </div>

    );
};

////////

export default NavBar;
