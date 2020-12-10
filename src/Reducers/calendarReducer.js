
import { types } from "../Type/types";

///////
/*
{ 
    id : dsfsafasfadsf,
    title : "Dia de la mishi", 
    start : moment().toDate(), 
    end : moment().add( 2, "hours" ).toDate() ,
    user : { id : "123", name : "Jose" }
} 
*/

const initialState = { events : [ ], activeEvents : null };

///////

const calendarReducer = ( state = initialState, action ) => 
{
   switch ( action.type ) 
   {
       case types.eventAddNew : return { ...state, events : [ ...state.events, action.payload ] };

       case types.eventSetActive : return { ...state, activeEvents : action.payload };

       case types.eventClearActive : return { ...state, activeEvents : null };

       case types.eventUpdate : 
       
       return { ...state, events : state.events.map( 
           
        ( event ) => event.id === action.payload.id ? action.payload : event
        
        ) };

        case types.eventDelete : 
       
        return { ...state, events : state.events.filter( 
            
         ( event ) => event.id !== state.activeEvents.id 
         
         ),

         activeEvents : null
        
        };

        case types.eventLoad : return { ...state, events : [ ...action.payload ] };
        
        case types.eventLogout : return { ...state, events : [], activeEvents : null  };

        default: return state;
   };

};

///////

export { calendarReducer }
