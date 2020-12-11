import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import RouterApp from '../../Routers/RouterApp';


/////

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = { auth : { checking : true, logged : false } };
const store = mockStore( initState );
//store.dispatch = jest.fn();

////

describe('Pruebas en RouterApp.js', () => 
{   
    
    test('Debe mostrar el espere', () => 
    {
        
        const initState = { auth : { checking : true, logged : false } };
        const store = mockStore( initState );

        const wrapper = mount( 
    
            <Provider store={ store }>
                <RouterApp/>
            </Provider> 
        
        );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find( "h5" ).exists() ).toBe( true );

    });


    test('Debe mostrar la ruta publica', () => 
    {

        const initState = { auth : { checking : false, logged : false } };
        const store = mockStore( initState );

        const wrapper = mount( 
    
            <Provider store={ store }>
                <RouterApp/>
            </Provider> 
        
        );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find( "h5" ).exists() ).toBe( false );

        expect( wrapper.find( ".login-container" ).exists() ).toBe( true );

    });


    test('Debe mostrar la ruta privada', () => 
    {

        const initState = 
        {   

            ui : 
            {
                modalOpen : false
            }
            ,
            calendar :
            {
                events : [],
                activeEvents : null
            }
            ,
            auth : 
            { 
                checking : false,
                logged : true,
                uid : "5fcec99e7818d81edc8eb3ac",
                name : "King" 
            } 

        };

        const store = mockStore( initState );

        const wrapper = mount( 
    
            <Provider store={ store }>
                <RouterApp/>
            </Provider> 
        
        );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find( ".navbar-brand" ).text().trim() ).toBe( "King" );

    });
    
});
