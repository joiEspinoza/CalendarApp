import { types } from "../Type/types";

/////

const initialState = 
{
    checking : true,
    logged : false,
    //uid : null,
    //name : null

};

/////

const authReducer = ( state = initialState, action ) => 
{

    //console.log( action );

   switch( action.type ) 
   {

       case types.authLogin : return { ...state, checking : false, logged : true ,...action.payload };

       case types.authCheckingFinish : return { ...state, checking : false };

       case types.authLogout : return { checking : false, logged : false };

       default: return state;

   };


};

/////

export { authReducer };
