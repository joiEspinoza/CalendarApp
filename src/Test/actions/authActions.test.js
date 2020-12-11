import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { starRegister, startChecking, startLogin, startLogout } from '../../Actions/authActions';
import Swal from 'sweetalert2';
import * as fetchModule from "../../Helpers/fetch";

///////

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();
let token = "";

//////


describe('Pruebas en authActions.js', () => 
{
    
    beforeEach( () => 
    {

        store = mockStore( initState );
        jest.clearAllMocks();

    });

    ////

    test('starLogin correcto ', async () => 
    {
         await store.dispatch( startLogin( "king@gmail.com", "123456" ) );

         const actions = store.getActions();

         expect( actions[0] ).toEqual(  

            {
                type: '[AUTH] login',
                payload: { uid: '5fcec99e7818d81edc8eb3ac', name: 'King' }
            } 

        );

        expect( localStorage.setItem ).toHaveBeenCalledWith( "token", expect.any( String ) );
        expect( localStorage.setItem ).toHaveBeenCalledWith( "creacionToken", expect.any( Number ) );

        token = localStorage.setItem.mock.calls[0][1]; 

    });

    test('login incorrecto ', async() => 
    {
   
        await store.dispatch( startLogin( "king@gmail.com", "123456456456" ) );

        let actions = store.getActions();

        expect( actions ).toEqual( [] );

        expect( Swal.fire ).toHaveBeenCalledWith( "error", "email o password no coinciden", "error" );


        await store.dispatch( startLogin( "kingasdad@gmail.com", "123456" ) );

        actions = store.getActions();

        expect( Swal.fire ).toHaveBeenCalledWith( "error", "email o password no coinciden", "error" );

    });

    test('startRegister correcto ', async() => 
    {
        fetchModule.fetchSinToken = jest.fn( () => ({

            json()
            {
                return { ok : true, uid : "ABC123", name : "MockMan", jsonWebToken : "token12321asdasdtoken" }
            }

        }));

        await store.dispatch( starRegister( "TestMan", "kingTest@gmail.com", "123456" ) );

        const actions = store.getActions(); 

        expect( actions[0] ).toEqual(  

             { type: '[AUTH] login', payload: { uid: 'ABC123', name: 'MockMan' } }
        );

        expect( localStorage.setItem ).toHaveBeenCalledWith( "token", "token12321asdasdtoken" );
        expect( localStorage.setItem ).toHaveBeenCalledWith( "creacionToken", expect.any( Number ) );

       
    });

    test('startChecking correcto', async() => 
    {
        fetchModule.fetchConToken = jest.fn( () => ({

            json()
            {
                return { ok : true, uid : "ABC123", name : "MockMan", jsonWebToken : "token12321asdasdtoken" }
            }

        }));
        
        await store.dispatch( startChecking() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual( { type: '[AUTH] login', payload: { uid: 'ABC123', name: 'MockMan' } } );
        expect( localStorage.setItem ).toHaveBeenCalledWith( "token", "token12321asdasdtoken" );
        expect( localStorage.setItem ).toHaveBeenCalledWith( "creacionToken", expect.any( Number ) );

    });
    

    test('startLogout debe funcionar ', async() => 
    {
        await store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual( { type: '[AUTH] logout' } );

        expect( localStorage.clear ).toHaveBeenCalled();

    });
    
 
    
    

});
