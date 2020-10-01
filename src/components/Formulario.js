import React, { Fragment, useState } from 'react'
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    const [error, setError] = useState(false)

    const actualizarState = e => {

        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    const {mascota, propietario, fecha, hora, sintomas} = cita

    const submitCita = (e) => {
        e.preventDefault()

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            setError(true)
            return
        }

        setError(false)

        cita.id = uuid()

        crearCita(cita)

        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }


    return (
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className='alerta-error'>Todos los campos son obligatorios</p> : null}
            <form onSubmit={(e) => submitCita(e)}>
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre de la mascota'
                    onChange={(e) => actualizarState(e)}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre del dueño de la mascota'
                    onChange={(e) => actualizarState(e)}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={(e) => actualizarState(e)}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={(e) => actualizarState(e)}
                    value={hora}

                />
                <label>Sintomas</label>
                <textarea
                    name='sintomas'
                    className='u-full-width'
                    onChange={(e) => actualizarState(e)}
                    value={sintomas}>
                </textarea>
                <button type='submit' className='u-full-width button-primary'>Agregar cita</button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario
