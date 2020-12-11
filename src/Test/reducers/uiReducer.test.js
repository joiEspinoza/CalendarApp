import { startLogout } from '../../Actions/authActions';
import { uiReducer } from '../../Reducers/uiReducer';
import { types } from '../../Type/types';

///

const initialState = { modalOpen : false };

////

describe('Pruebas en uiReducer.js', () => 
{
    
    test('debe retornar el estado por defecto ', () => 
    {

        const action = { type : types.authLogin };

        const state = uiReducer( initialState, action );

        expect( state ).toEqual( initialState );

    });


    test('debe retornar modalOpen en true ', () => 
    {

        const action = { type : types.uiOpenModal };

        const state = uiReducer( initialState, action );

        expect( state ).toEqual( { modalOpen : true } );

    });


    test('debe retornar modalOpen en false ', () => 
    {

        const action = { type : types.uiCloseModal };

        const state = uiReducer( initialState, action );

        expect( state ).toEqual( { modalOpen : false } );

    });
    

});
