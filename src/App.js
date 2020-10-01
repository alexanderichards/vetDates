import React, { Fragment, useState, useEffect} from 'react';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if(!citasIniciales){
    citasIniciales = []
  }

  const [citas, setCitas] = useState(citasIniciales)

  const crearCita = cita => {
    setCitas([...citas,cita])
  }

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas([...nuevasCitas])
  }

  useEffect(() => {
    if(citasIniciales){
       localStorage.setItem('citas', JSON.stringify(citas))
    } else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales])

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className='container'>
        <div className='row'>
          <div  className='one-half column'>
            <Formulario crearCita={crearCita}></Formulario>
          </div>
          <div  className='one-half column'>
            {citas.length > 0 ? <h2>Administra tus citas</h2> : <h2>Agrega una cita</h2>}
            
            {citas.map(cita => (
              <Cita cita={cita} key={cita.id}
              eliminarCita={eliminarCita}></Cita>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
