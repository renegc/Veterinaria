import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario'  ;
import Cita from './components/Cita'  ;




function App() {
//localstorage
let citasIniciales = JSON.parse(localStorage.getItem('citas'));
if(!citasIniciales){
    citasIniciales =[]
}


// citas 
const [citas, guardarCitas] = useState(citasIniciales);


//para cuando el state
useEffect(() => {
   if(citasIniciales){
     localStorage.setItem('citas', JSON.stringify(citas));
   }else{

     localStorage.setItem('citas', JSON.stringify([]));
   }
}, [citas, citasIniciales]);

//modificar state
const crearCita = cita => {
  guardarCitas([
    ...citas,
    cita
  ]);
}


const eliminarCita = id =>{
  const nuevasCitas = citas.filter(cita => cita.id !== id );
  guardarCitas(nuevasCitas);
}

const titulo = citas.length ===0 ? 'No hay Citas' : 'Administra tus Citas';

  return (
    <Fragment>
    <h1> Adminstrador de pacientes</h1>

    <div className="container"> 
      <div className="row">
        <div className="one-half column">
        <Formulario
          crearCita={crearCita}
        />
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
            key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>

      </div>
    </div>

    </Fragment>

  );
}

export default App;
