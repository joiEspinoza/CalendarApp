import React from 'react'
import RouterApp from '../Routers/RouterApp';
import { Provider } from 'react-redux'
import { store } from '../Store/store';

//////

const CalendarApp = () => 
{

    return (

       <Provider store={ store }>
            <RouterApp/>
       </Provider>

    );
};

/////

export default CalendarApp;
