import { authReducer } from '../../Reducers/authReducer';
import { types } from '../../Type/types';


////


describe('Pruebas en authReducer.js', () => 
{
    const initialState = { checking : false, logged : false };

    let state = "";

    /////

    test('Debe retornar el estado por defecto ', () => 
    {
        const action = { type : types.uiOpenModal };

        state = authReducer( initialState, action );

        expect( state ).toEqual( initialState );

    });

    test('Login debe retornar logged en true e informacion de logeo ', () => 
    {
            const action = { type : types.authLogin, payload : { uid : "ABC123", name : "TestMan" } };

            state = authReducer( state, action );

            expect( state ).toEqual( { checking: false, logged: true, uid: 'ABC123', name: 'TestMan' } );
    });


    test('AuthCheckingFinish debe retornar checking en false ', () => 
    {
        const action = { type : types.authCheckingFinish  };

        state = authReducer( state, action );

        expect( state ).toEqual( { checking: false, logged: true, uid: 'ABC123', name: 'TestMan' } );

    });


    test('Logout debe restablecer el estado por defecto ', () => 
    {
        
        const action = { type : types.authLogout };

        state = authReducer( state, action );

        expect( state ).toEqual( initialState );

    });
    
    
});
