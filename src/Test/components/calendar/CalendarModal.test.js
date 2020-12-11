import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import CalendarModal from '../../../Components/calendar/CalendarModal';
import moment from "moment";
import { eventClearActiveEventAction, eventStartAddNew, startEventUpdateAction } from '../../../Actions/eventActions';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

/////


jest.mock( '../../../Actions/eventActions', () =>( 
    
    ( { 
        
        startEventUpdateAction : jest.fn(), 
        eventClearActiveEventAction : jest.fn(),
        eventStartAddNew : jest.fn()

    } )
    
));


const closeModal = jest.fn();

/////

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

//////

const now = moment().minutes( 0 ).seconds( 0 ).add( 1, "hours" );

const nowPlus1 = now.clone().add( 1,"hours" );

const initState = 
{   

    ui : 
    {
        modalOpen : true
    }
    ,
    calendar :
    {
        events : [],
        activeEvents : 
        {
            title : "Hola",
            notes : "notas",
            start : now.toDate(),
            end : nowPlus1.toDate()
        }
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

/////

store.dispatch = jest.fn();

Storage.prototype.setItem = jest.fn();

////

describe('Pruebas en CalendarModal.js', () => 
{
    beforeEach(() => {

        jest.clearAllMocks()

    } );

    const wrapper = mount( 
    
        <Provider store={ store }>
            <CalendarModal/>
        </Provider> 
    
    );

    test('debe mostrar Modal ', () => 
    {
        expect( wrapper.find( "Modal" ).prop( "isOpen" ) ).toBe( true );
    });
     

    test('Debe llamar la accion de actualizar y cerrar modal', () => 
    {
       
            wrapper.find( "form" ).simulate( "submit",{
            
                preventDefault(){} 
            })

            expect( startEventUpdateAction ).toHaveBeenCalledWith( initState.calendar.activeEvents );

            expect( eventClearActiveEventAction ).toHaveBeenCalled();
        
    });
    

    test('debe mostrar error si falta titulo ',() => 
    {

        wrapper.find( "form" ).simulate( "submit",{
            
            preventDefault(){} 
        })

        expect( wrapper.find( 'input[name="title"]' ).hasClass("is-invalid") ).toBe( true );

    });



    test('Debe crear un nuevo evento', () => 
    {
        const initState = 
        {   

            ui : 
            {
                modalOpen : true
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

        const wrapper = mount( 
    
            <Provider store={ store }>
                <CalendarModal/>
            </Provider> 
        
        );

        ///////////////////////////////////////////////


        wrapper.find( 'input[name="title"]' ).simulate( "change", 
        {

            target : { name : "title", value : "TEST" }

        } );


        wrapper.find( "form" ).simulate( "submit",{
            
            preventDefault(){} 
        })

        expect( eventStartAddNew ).toHaveBeenCalledWith( {"end": expect.anything(), "notes": "", "start": expect.anything(), "title": "TEST"} );
        expect( eventClearActiveEventAction ).toHaveBeenCalled();
    });


    test('Debe validar las fechas', () => 
    {
        wrapper.find( 'input[name="title"]' ).simulate( "change", 
        {

            target : { name : "title", value : "TEST" }

        } );

        const hoy = new Date();

        act( () =>
        {

            wrapper.find( "DateTimePicker" ).at( 1 ).prop( "onChange")( hoy );

        } );

        wrapper.find( "form" ).simulate( "submit",{
            
            preventDefault(){} 
        });

        expect( Swal.fire ).toHaveBeenCalledWith( "Error", "Fecha fin debe der mayor a fecha inicio", "error" );
      
    });
    
    


     
});
