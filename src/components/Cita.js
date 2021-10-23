import React, { Fragment, useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
const Cita = (props) => {


    // creamos un estatus para editar la cita 
    const [citaEditar, guardarCitaEditar] = useState([
        { nombre: '' },
        { propietario: '' },
        { fecha: '' },
        { hora: '' },
        { telefono: '' },
        { sintomas: '' }
    ]);


    if (!props.cita) {
        props.history.push('/');
        return null;
    }


    // extraer por props
    const { cita: { _id, nombre, propietario, fecha, hora, telefono, sintomas } } = props;


    // motodo para eliminar una cita 
    const eliminarCita = id => {

        Swal.fire({
            title: '¿Estas seguro?',
            text: "Una cita eliminada no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {

                // Alerta de eliminado
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )

                // Eliminado de la base de datos
                clienteAxios.delete(`/pacientes/${id}`)
                    .then(respuesta => {
                        props.guardarConsultar(true);
                        props.history.push('/');

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })



    }
    //catturar datos
    const capturarDatos = e => {
        document.querySelector('#nombre').value = nombre
        document.querySelector('#propietario').value = propietario
        document.querySelector('#telefono').value = telefono
        document.querySelector('#fecha').value = fecha
        document.querySelector('#hora').value = hora
        document.querySelector('#sintomas').value = sintomas

    }


    // motodo para actualizar una cita 
    const Actualizar = (id) => {
        citaEditar[0].nombre = document.querySelector('#nombre').value;
        citaEditar[0].propietario = document.querySelector('#propietario').value;
        citaEditar[0].telefono = document.querySelector('#telefono').value;
        citaEditar[0].fecha = document.querySelector('#fecha').value;
        citaEditar[0].hora = document.querySelector('#hora').value;
        citaEditar[0].sintomas = document.querySelector('#sintomas').value;
      

         Swal.fire({
             title: '¿Estas seguro?',
             text: "De editar esta cita",
             icon: 'warning',
             showCancelButton: true,
         confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Si, Editar!',
         cancelButtonText: 'Cancelar'
         }).then((result) => {
             if (result.value) {

                // Alerta de eliminado
                 Swal.fire(
                     'Editado!',
                     'Se edito correctamente.',
                     'success'
                )

        // Eliminado de la base de datos
        clienteAxios.put(`/pacientes/${id}`, citaEditar[0])
            .then(respuesta => {
                props.guardarConsultar(true);
                props.history.push('/');

            })
            .catch(error => {
                console.log(error)
            })
             }
         })




    }


    return (
        <Fragment>
            <h1 className="my-5">Nombre cita: {nombre}</h1>

            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
                    </div>

                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="mb-3">{nombre}</h3>
                                    <small className="fecha-alta">
                                        {fecha} - {hora}
                                    </small>
                                </div>

                                <p className="mb-0">
                                    {sintomas}
                                </p>
                                <div className="contacto py-3">
                                    <p>Dueño: {propietario}</p>
                                    <p>Teléfono: {telefono}</p>
                                </div>

                                <div className="d-flex">
                                    {<button
                                        type="button"
                                        className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger col"
                                        onClick={() => eliminarCita(_id)}
                                    >
                                        Eliminar &times;
                                    </button>}
                                </div>
                                <div className="d-flex">
                                    <button
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        className="text-uppercase py-2 px-5 mt-5 font-weight-bold btn btn-primary col"
                                        onClick={capturarDatos}
                                    >
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Editar Paciente {nombre}</h5>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form
                                className="bg-white p-5 bordered"
                            >

                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre Mascota</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="nombre"
                                        name="nombre"


                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="propietario">Nombre Propietario</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="propietario"
                                        name="propietario"
                                        placeholder="Nombre Propietario"

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input
                                        type="tel"
                                        className="form-control form-control-lg"
                                        id="telefono"
                                        name="telefono"


                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fecha">Fecha Alta</label>
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        id="fecha"
                                        name="fecha"

                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="hora">Hora Alta</label>
                                    <input
                                        type="time"
                                        className="form-control form-control-lg"
                                        id="hora"
                                        name="hora"

                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="sintomas">Síntomas</label>
                                    <textarea
                                        className="form-control"
                                        id="sintomas"
                                        name="sintomas"
                                        rows="6"

                                    ></textarea>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => Actualizar(_id)}>Editar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default withRouter(Cita);