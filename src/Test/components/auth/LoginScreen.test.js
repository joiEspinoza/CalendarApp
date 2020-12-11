import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import LoginScreen from '../../../Components/auth/LoginScreen';
import { starRegister, startLogin } from '../../../Actions/authActions';
import Swal from 'sweetalert2';

/////

jest.mock( '../../../Actions/authActions', () =>
( 
    { 
        startLogin : jest.fn(),
        starRegister : jest.fn()
    } 

));


////

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState );
store.dispatch = jest.fn();

//////

describe('Pruebas en LoginScreen.js', () => 
{
    
    beforeEach( () =>
    {

        jest.clearAllMocks();

    } );

    ////

    const wrapper = mount( 
    
        <Provider store={ store }>
            <LoginScreen/> 
        </Provider>
    
    );
   
    /////

    test('Debe mostrarse correctamente ', () => 
    {
        expect( wrapper ).toMatchSnapshot();
    });


    test('Debe llamar el dispatch del login', () => 
    {
        
        wrapper.find( 'input[name="correoIngreso"]' ).simulate( "change", 
        {

            target : { name : "correoIngreso", value : "king2@gmail.com" }

        } );

        wrapper.find( 'input[name="passwordIngreso"]' ).simulate( "change", 
        {

            target : { name : "passwordIngreso", value : "123456" }

        } );

        wrapper.find( "form" ).at( 0 ).prop( "onSubmit" )( {  

            preventDefault(){}

        } );

        expect( startLogin ).toHaveBeenCalledWith( "king2@gmail.com", "123456" );

    });



    test('No hay registro si las contraseñas no son iguales', () => 
    {
      
        wrapper.find( 'input[name="passwordRegistro"]' ).simulate( "change", 
        {

            target : { name : "passwordRegistro", value : "ABCDE" }

        } );


        wrapper.find( 'input[name="passwordRegistro2"]' ).simulate( "change", 
        {

            target : { name : "passwordRegistro2", value : "1234ABCDE" }

        } );

        wrapper.find( "form" ).at( 1 ).prop( "onSubmit" )( {  

            preventDefault(){}

        } );

        expect( starRegister ).toHaveBeenCalledTimes( 0 );
        expect( starRegister ).not.toHaveBeenCalled();
        expect( Swal.fire ).toHaveBeenCalledWith( "error", "las contraseñas deben ser iguales", "error" );


    });

    test('Debe disparar el registro con contraseñas iguales', () => 
    {
        
        wrapper.find( 'input[name="passwordRegistro"]' ).simulate( "change", 
        {

            target : { name : "passwordRegistro", value : "ABCDE" }

        } );


        wrapper.find( 'input[name="passwordRegistro2"]' ).simulate( "change", 
        {

            target : { name : "passwordRegistro2", value : "ABCDE" }

        } );

        wrapper.find( "form" ).at( 1 ).prop( "onSubmit" )( {  

            preventDefault(){}

        } );

        expect( starRegister ).toHaveBeenCalledTimes( 1 );

    });
    
    
    
});
