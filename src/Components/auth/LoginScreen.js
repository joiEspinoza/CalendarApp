import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { starRegister, startLogin } from '../../Actions/authActions';
import useForm from '../../hooks/useForm';
import "../../Style/login.css"

/////

const LoginScreen = () => 
{

    const dispatch = useDispatch();

    //////

    const initLoginFormValues = 
    {
        correoIngreso : "king@gmail.com",
        passwordIngreso : "123456",
    };

    const [ formLoginValues, handleLoginInputChange ] = useForm( initLoginFormValues );

    const { correoIngreso, passwordIngreso } = formLoginValues;

    const handleLogin = ( e ) =>
    {
        e.preventDefault();
        dispatch( startLogin( correoIngreso, passwordIngreso  ) );

    };

    /////////

    const initRegisterFormValues = 
    {
        nombreRegistro : "",
        correoRegistro : "",
        passwordRegistro : "",
        passwordRegistro2 : "",
    };

    const [ formRegisterValues, handleRegisterInputChange ] = useForm( initRegisterFormValues );

    const { nombreRegistro, correoRegistro, passwordRegistro, passwordRegistro2 } = formRegisterValues;

    const handleRegister = ( e ) =>
    {
        e.preventDefault();
        
        if( passwordRegistro !== passwordRegistro2 )
        {
            return Swal.fire( "error", "las contraseñas deben ser iguales", "error" );
        };

        dispatch( starRegister( nombreRegistro, correoRegistro, passwordRegistro ) );

    };

    //////////

  

    ///////////////////////////////////////////////////////


    return (

            <div className="container login-container">

                <div className="row">

                    <div className="col-md-6 login-form-1">

                        <h3>Ingreso</h3>

                        <form onSubmit={ handleLogin }>

                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Correo" name="correoIngreso" value={ correoIngreso } onChange={ handleLoginInputChange } />
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Contraseña" name="passwordIngreso" value={ passwordIngreso } onChange={ handleLoginInputChange } />
                            </div>

                            <div className="form-group">
                                <input type="submit" className="btnSubmit" value="Login" />
                            </div>

                        </form>

                    </div>
    
                    <div className="col-md-6 login-form-2">

                        <h3>Registro</h3>

                        <form onSubmit={ handleRegister } >

                            <div className="form-group">
                                <input type="text"className="form-control" placeholder="Nombre" name="nombreRegistro" value={ nombreRegistro } onChange={ handleRegisterInputChange } />
                            </div>

                            <div className="form-group">
                                 <input type="email" className="form-control" placeholder="Correo" name="correoRegistro" value={ correoRegistro } onChange={ handleRegisterInputChange } />
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Contraseña" name="passwordRegistro" value={ passwordRegistro } onChange={ handleRegisterInputChange } />
                            </div>
    
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Repita la contraseña" name="passwordRegistro2" value={ passwordRegistro2 } onChange={ handleRegisterInputChange } />
                            </div>
    
                            <div className="form-group">
                                <input type="submit" className="btnSubmit"  value="Crear cuenta" />
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        );

};

///////

export default LoginScreen;
