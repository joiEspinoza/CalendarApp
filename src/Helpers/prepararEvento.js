import moment from "moment";


const prepararEvento = ( eventos = [] ) =>
{

   return eventos.map( ( evento ) => ({ 

        ...evento,
        end : moment( evento.end ).toDate(),
        start : moment( evento.start ).toDate(),

   }) );


};

////

export { prepararEvento };