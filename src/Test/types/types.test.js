const { types } = require("../../Type/types");

////

describe('Pruebas en types.js', () => 
{
    const mockTypes = 
    {  
        uiOpenModal : "[UI] open modal",
        uiCloseModal : "[UI] close modal",
    
        eventSetActive: "[EVENT] set active",
        eventStartAddNew : "[EVENT] start add new",
        eventAddNew: "[EVENT] add new",
        eventClearActive: "[EVENT] clear active",
        eventUpdate: "[EVENT] update event",
        eventDelete : "[EVENT] delete event",
        eventLoad : "[EVENT] load event",
        eventLogout : "[EVENT] logout event",
    
        authCheckingFinish : "[AUTH] finish cheking login state",
        authStartLogin : "[AUTH] start login",
        authLogin : "[AUTH] login",
        authStartRegister : "[AUTH] start register",
        authStartTokenReNew : "[AUTH] start token renew",
        authLogout : "[AUTH] logout"
    };

    ///////

    test('los types deben coincidir ', () => 
    {
        
        expect( types ).toEqual( mockTypes );

        
    });
       
});
