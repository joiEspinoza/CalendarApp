import Swal from "sweetalert2";
import { fetchConToken } from "../Helpers/fetch";
import { prepararEvento } from "../Helpers/prepararEvento";
import { types } from "../Type/types";

//////

const eventStartAddNew = ( evento ) =>
{
    return async ( dispatch, getState ) =>
    {
        try 
        {

            const { uid, name } = getState().auth;

            const response =  await fetchConToken( "events", evento, "POST" );

            const data = await response.json();

            if( data.ok )
            {
                
                evento.id = data.evento.id;
                evento.user = { _id : uid, name };
                console.log( evento );
                dispatch( eventAddNewAction( evento )  );
            };


        } 
        catch( error ) 
        {
                console.log( error );
        };

    };
};

const eventAddNewAction = ( event ) => ( { type : types.eventAddNew, payload : event } );

const eventStartLoading = () =>
{
    return async ( dispatch ) =>
    {

        try 
        {
            const response = await fetchConToken( "events" );
            const data = await response.json();
    
            const eventos =  prepararEvento( data.eventos );

            dispatch( eventLoading( eventos ) );

        } 
        catch( error ) 
        {
            console.log( error );
        };


    };
};

const eventLoading = ( eventos ) => ( { type : types.eventLoad, payload : eventos } );

const startEventUpdateAction = ( updateEvent ) =>
{
    return async ( dispatch, getState ) => 
    {

        const { id } = getState().calendar.activeEvents;

        try 
        {
            const response =  await fetchConToken( `events/${ id }`, updateEvent , "PUT" ); 
            
            const data = await response.json();

            if( data.ok )
            {
                dispatch( eventUpdateAction( data.evento ) );
            }
            else
            {
                Swal.fire( "error",data.msg,"error" );
            };

        } 
        catch( error ) 
        { 
            console.log( error );
        };

    };
};

const eventUpdateAction = ( event ) => ( { type : types.eventUpdate, payload : event } );


const startDeleteAction = () =>
{
    return  async ( dispatch, getState ) =>
    {
        try 
        {
            const { id } = getState().calendar.activeEvents;

            const response = await fetchConToken( `events/${ id }`, {} , "DELETE" );

            const data = await response.json();

            if( data.ok )
            {
                dispatch( eventDeleteAction() );
            }
            else
            {
                Swal.fire( "error", data.msg, "error" );
            };


        } 
        catch( error ) 
        {
            console.log( error );
        };
    };
};

const eventDeleteAction = () => ( { type : types.eventDelete } );

//////////////////////////

const eventLogout = () => ( { type : types.eventLogout } );

const eventSetActiveAction = ( event ) => ( { type : types.eventSetActive, payload : event } );

const eventClearActiveEventAction = () => ( { type : types.eventClearActive } );


/////

export 
{  
    eventStartAddNew,
    eventStartLoading,
    startDeleteAction,
    startEventUpdateAction,
    eventSetActiveAction, 
    eventClearActiveEventAction,
    eventLogout
};