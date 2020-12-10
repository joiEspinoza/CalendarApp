import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../Helpers/fetch';
import { types } from '../Type/types';

//////

const startLogin = ( email, password ) =>
{
    return async ( dispatch ) => 
    {
        try 
        {

            const response = await fetchSinToken( "auth", { email, password }, "POST" );
            const body = await response.json();

            if( body.ok )
            {
                localStorage.setItem( "token", body.jsonWebToken );
                localStorage.setItem( "creacionToken" , new Date().getTime() );

                dispatch( login( { uid : body.uid, name : body.name } ) );
            }
            else
            {

                if( !body.errors )
                {
                    return Swal.fire( "error", body.msg, "error" );
                };

                if( body.errors.password )
                {
                    return Swal.fire( "error", body.errors.password.msg, "error" );
                };

                if( body.errors.email )
                {
                    return Swal.fire( "error", body.errors.email.msg, "error" );
                };

            };

        } 
        catch( error ) 
        {
            console.log( error );
            return Swal.fire( "error", error, "error" );
        };
    };
}

const login = ( user ) => ( { type : types.authLogin, payload : user } );


const starRegister = ( name, email, password ) =>
{
    
    return async ( dispatch ) => 
    {
       try 
       {

            const response = await fetchSinToken( "auth/register", { name, email, password }, "POST" );
            const data = await response.json();

            if( data.ok )
            {
                
                localStorage.setItem( "token", data.jsonWebToken );
                localStorage.setItem( "creacionToken" , new Date().getTime() );

                dispatch( login( { uid : data.uid, name : data.name } ) );

                Swal.fire( "Listo", "Usuario creado exitosamente", "success" );
                
            }
            else
            {
        

                if( !data.errors )
                {
                    return Swal.fire( "error", data.msg, "error" );
                };
                
                if( data.errors.name )
                {
                    return Swal.fire( "error", data.errors.name.msg, "error" );
                }

                if( data.errors.email )
                {
                    return Swal.fire( "error", data.errors.email.msg, "error" );
                }

                if( data.errors.password )
                {
                    return Swal.fire( "error", data.errors.password.msg, "error" );
                }

            
            };
       } 
       catch( error ) 
       {
            console.log( error );
            return Swal.fire( "error", error,"error" );
       };

    };
};


const startChecking = () =>
{
    return async ( dispatch ) => 
    {

        try 
        {
            
            const response = await fetchConToken( "auth/revalidtoken" );
            const data = await response.json();
    
    
            if( data.ok )
            {
                    
                localStorage.setItem( "token", data.jsonWebToken );
                localStorage.setItem( "creacionToken" , new Date().getTime() );
    
                dispatch( login( { uid : data.uid, name : data.name } ) );
                    
            }
            else
            {
                dispatch( checkingFinish() );
            };

        } 
        catch( error ) 
        {
            
        }

    };
};


const checkingFinish = () => ( { type : types.authCheckingFinish } );


const startLogout = () =>
{

    return ( dispatch ) =>
    {
        localStorage.clear();
        dispatch( logout() );
    };

};

const logout = () => ( { type : types.authLogout } );


////

export { startLogin, starRegister, startChecking, startLogout , login  };