import React, { useEffect, useState } from 'react';
import NavBar from '../ui/NavBar';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from '../../Helpers/calendar-messages-es';
import "moment/locale/es-mx";
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModalAction } from "../../Actions/uiActions";
import { eventClearActiveEventAction, eventSetActiveAction, eventStartLoading } from '../../Actions/eventActions';
import { AddNewButton } from '../ui/AddNewButton';
import DeleteButton from '../ui/DeleteButton';


//////

moment.locale( "es" ); //cambia idioma moment

//////

const localizer = momentLocalizer(moment);

//////


const CalendarScreen = () => 
{
  
    const { events, activeEvents } = useSelector( state => state.calendar );
    const { uid } = useSelector( state => state.auth );

    ////

    const eventStyleGetter = ( event, start, end, isSelected ) =>
    {
      
        const style = 
        {   
            backgroundColor : ( uid === event.user._id ) ? "#367CF7" : "#c62020", 
            borderRadius : "0px", 
            opacity : 0.8,
            display : "block",
            color : "white",

        };

        return { style };

    };

    /////

    const dispatch = useDispatch();


    const [ lastView, setLastView ] = useState( localStorage.getItem( "lastView" ) ||  "month" );

    //////

    useEffect(() =>
    {

        dispatch( eventStartLoading() );
        

    }, [ dispatch ])

    /////

    const onDoubleClick = ( e ) =>
    {
        dispatch( uiOpenModalAction() );
    };

    const onSelect = ( e ) =>
    {
        dispatch( eventSetActiveAction( e ) );
        
    };

    const onViewChange = ( e ) =>
    {
        setLastView( e );
        localStorage.setItem( "lastView", e );
    };

    const onSelectSlot = ( e ) =>
    {
        dispatch( eventClearActiveEventAction() );
    };

    //////

    return (

        <div className="calendar-screen">

            <NavBar/>


            <Calendar 

                localizer={ localizer } 
                events={ events } 
                messages={ messages } 
                eventPropGetter={ eventStyleGetter } 
                components={ { event : CalendarEvent } }
                onDoubleClickEvent = { onDoubleClick }
                onSelectEvent = { onSelect }
                onView = { onViewChange }
                view={ lastView }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                startAccessor="start" 
                endAccessor="end" 

            />

            <AddNewButton/>

            { activeEvents && <DeleteButton/> }

            <CalendarModal/>

        </div>

    );
};

//////

export default CalendarScreen;
