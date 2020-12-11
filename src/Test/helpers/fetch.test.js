const { fetchSinToken, fetchConToken } = require("../../Helpers/fetch");

////

describe('Pruebas en fetch.js', () => 
{
    let token = "";

    test('fetch sin token debe funcionar ', async () => 
    {
            const email = "king@gmail.com";
            const password = "123456";

            const response = await fetchSinToken( "auth", { email , password }, "POST" );
            const data =  await response.json();
            
            expect( data.ok ).toBe( true );
            expect( response instanceof Response ).toBe( true );

            token = data.jsonWebToken;

    });

    test('fetch con token debe funcionar ', async () => 
    {
        localStorage.setItem( "token", token );

        const response = await fetchConToken( "events/5fd0127f5ddef923e036bdc3", {}, "DELETE" );
        const data = await response.json();

        expect( data.msg ).toBe( "Evento no encontrado" );

    });
     

});
