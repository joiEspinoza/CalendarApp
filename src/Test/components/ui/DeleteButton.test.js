import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import DeleteButton from '../../../Components/ui/DeleteButton';
import "@testing-library/jest-dom";
import { startDeleteAction } from '../../../Actions/eventActions';

/////

jest.mock( '../../../Actions/eventActions', () =>( 
    
    ( { startDeleteAction : jest.fn() } )
    
));


/////

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState );
store.dispatch = jest.fn();

////

describe('Pruebas en DeleteButton.js', () => 
{
    const wrapper = mount( 
    
        <Provider store={ store } >

            <DeleteButton/> 

        </Provider>
    
    );

    /////

    test('Debe mostrarse correctamente ', () => 
    {
        expect( wrapper ).toMatchSnapshot();
    });


    test('Debe disparar startDeleteAction', () => 
    {
        wrapper.find("button").prop( "onClick" )();

        expect( startDeleteAction ).toHaveBeenCalled();
    });
    
});
