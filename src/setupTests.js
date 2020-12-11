import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';
import Swal from 'sweetalert2';
 //import Adapter from 'enzyme-adapter-react-16';


jest.mock( 'sweetalert2', ()=>
(
    
    ( { fire : jest.fn() } )

) );

HTMLCanvasElement.prototype.getContext = () => {};


expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
Enzyme.configure({ adapter: new Adapter() });
