import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import "../../Style/modal.css";
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModalAction } from '../../Actions/uiActions';
import { eventClearActiveEventAction, eventStartAddNew,startEventUpdateAction } from '../../Actions/eventActions';

///////////////////////////////////////////////////////////////////////////////////////////

const customStyles = 
{
    content :
    {

      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'

    }
};

/////

if( process.env.NODE_ENV !== "test" )
{
    Modal.setAppElement('#root');
};

//////

const now = moment().minutes( 0 ).seconds( 0 ).add( 1, "hours" );

const nowPlus1 = now.clone().add( 1,"hours" );

//////

const initiEvent = 
{ 
    title : "",
    notes : "",
    start : now.toDate(),
    end : nowPlus1.toDate()

};

/////////////////////////////////////////////////////////////////////////////////////////////

const CalendarModal = () => 
{

    const { modalOpen } = useSelector( state => state.ui );

    const { activeEvents } = useSelector( state => state.calendar );

    const dispatch = useDispatch();

    const [ dateStart, setDateStart ] = useState( now.toDate() );

    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );

    const [ titleValid, setTitleValid ] = useState( true );

    const [ formValues, setFormValues ] = useState( initiEvent );

    const { notes, title, start, end } = formValues;

    ////////

    useEffect( () => 
    {
        if( activeEvents )
        {
            setFormValues( activeEvents );
        }
        else
        {
            setFormValues( initiEvent );
        };
        
    }, [ activeEvents ] );

    ///////

    const handleInputChange = ( { target } ) =>
    {
        setFormValues( { ...formValues, [ target.name ] : target.value } );
    };

   ////////

    const closeModal = ( event ) =>
    {
        dispatch( uiCloseModalAction() );
        setFormValues( initiEvent );
        dispatch( eventClearActiveEventAction() );
    };

    ///////

    const handleStarDateChange = ( event ) =>
    {
        setDateStart( event );
        
        setFormValues( { ...formValues, start : event } );
    };

    ///////

    const handleEndDateChange = ( event ) =>
    {
        setDateEnd( event );

        setFormValues( { ...formValues, end : event } );
    };

    ////////

    const handleSubmit = ( event ) =>
    {
        event.preventDefault();

        const momentStart = moment( start );

        const momentEnd = moment( end );

        if( momentStart.isSameOrAfter( momentEnd ) )
        {
            return Swal.fire( "Error","Fecha fin debe der mayor a fecha inicio","error" );
        };

        if( title.trim().length < 2 )
        {
            //return Swal.fire( "Error","Titulo debe contener más de 2 caracteres","error" );
            return setTitleValid( false );
        };


        if( activeEvents )
        {
            dispatch( startEventUpdateAction( formValues ) );
        }
        else
        {
            dispatch( eventStartAddNew ( formValues ) );
        };

        
        setTitleValid( true );

        closeModal();
    }

    ///////////////////////////////////////////////////////////////////////////////

    return (


        <Modal
          isOpen={ modalOpen }
          //onAfterOpen={ afterOpenModal }
          onRequestClose={ closeModal }
          style={ customStyles }
          closeTimeoutMS={ 200 }
          className="modal"
          overlayClassName="modal-fondo"
          ariaHideApp={ !process.env.NODE_ENV === "test" }
        >

        <h1> { activeEvents ? "Editar evento" : "Nuevo evento" } </h1>
        <hr />

        <form  onSubmit={ handleSubmit } className="container">

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker className="form-control" onChange={ handleStarDateChange } value={ dateStart } />
            </div>

            <div className="form-group">
            <label>Fecha y hora Termino</label>
                <DateTimePicker className="form-control" onChange={ handleEndDateChange } value={ dateEnd } minDate={ dateStart } />
            </div>


            <hr />


            <div className="form-group">

                <label>Titulo y notas</label>

                <input type="text" className={ `form-control ${ !titleValid && "is-invalid" }` } placeholder="Título del evento" name="title" value={ title } onChange={ handleInputChange } autoComplete="off" />

                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>

            </div>


            <div className="form-group">

                <textarea type="text" className="form-control" placeholder="Notas" rows="5" name="notes" value={ notes } onChange={ handleInputChange } ></textarea>

                <small id="emailHelp" className="form-text text-muted">Información adicional</small>

            </div>


            <button type="submit" className="btn btn-outline-primary btn-block">
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>

        </Modal>

    );
};

////////////////////////////////////////////////////////////////////////////////////////

export default CalendarModal
