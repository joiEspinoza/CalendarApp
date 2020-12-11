import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import CalendarScreen from '../../../Components/calendar/CalendarScreen';
import { messages } from '../../../Helpers/calendar-messages-es';
import { uiOpenModalAction } from '../../../Actions/uiActions';
import { eventSetActiveAction } from '../../../Actions/eventActions';
import { act } from '@testing-library/react';

/////

jest.mock( '../../../Actions/uiActions', () =>( 
    
    ( { uiOpenModalAction : jest.fn() } )
    
));

jest.mock( '../../../Actions/eventActions', () =>( 
    
    ( { eventSetActiveAction : jest.fn(), eventStartLoading : jest.fn() } )
    
));

/////

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

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
store.dispatch = jest.fn();

Storage.prototype.setItem = jest.fn();

////

describe('Pruebas en CalendarScreen.js', () => 
{
    const wrapper = mount( 
    
        <Provider store={ store } >
             <CalendarScreen/>
        </Provider>
   
    );

    test('Debe mostrarse correctamente ', () => 
    {

        expect( wrapper ).toMatchSnapshot();

    });


    test('Pruebas con las interacciones del calendario', () => 
    {

        const calendar = wrapper.find( "Calendar" );

        const calendarMessages = calendar.prop( "messages" );

        expect( calendarMessages ).toEqual( messages );

        calendar.prop( "onDoubleClickEvent" )();

        expect( uiOpenModalAction ).toHaveBeenCalled();

        calendar.prop( "onSelectEvent" )( { start : "hola" } );

        expect( eventSetActiveAction ).toHaveBeenCalledWith( { start : "hola" } );

        act( () =>
        {
            calendar.prop( "onView" )( "week" );

            expect( localStorage.setItem ).toHaveBeenCalledWith( "lastView","week" );
    
        });
    
    });
    
    

});
