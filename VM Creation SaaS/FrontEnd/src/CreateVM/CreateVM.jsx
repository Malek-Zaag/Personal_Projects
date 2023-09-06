import Navbarcreate from "./Navbarcreate.jsx";
import Form from './Form';
import './form.css';
function CreateVm(){

    return( 
        <div className="CreateVM">
        <Navbarcreate></Navbarcreate>
       
        <main className='main-container'>
      
          <Form />
      </main>
        </div>
    )
}
export default CreateVm;