import { useEffect, useState } from "react";
import "../css/admin.css";
import "../css/aside.css";
import Header from '../other/headerAdmin.jsx';
import Aside from '../other/aside.jsx';
import API_BASE_URL from "../js/APIconfig.js";
import Swal from 'sweetalert2';

function adminVehiculos() {

    const [vehiculos, setVehiculos] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newVehiculo, setNewVehiculo] = useState({ modelo: "", placa: "", anio: "", kilometraje: "", valorDia: "", color: "", foto: "" });
    const [reload, setReload] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {

        const fetchVehiculos = async () => {

            try {
                const response = await fetch(`${API_BASE_URL}/vehiculos`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los vehiculos');
                }

                const data = await response.json();
                
                setVehiculos(data);

            } catch (err) {
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        const fetchModelos = async () => {

            try {
                const response = await fetch(`${API_BASE_URL}/modelos`, {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los modelos');
                }

                const data = await response.json();
                setModelos(data);

            } catch (err) {
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        fetchModelos();
        fetchVehiculos();
    }, [accessToken, reload]);

    const handleAgregarVehiculo = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewVehiculo({ modelo: "", placa: "", anio: "", kilometraje: "", valorDia: "", color: "", foto: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("foto", newVehiculo.foto);
        formData.append(
            "data",
            new Blob([JSON.stringify({
                idModelo: newVehiculo.modelo,
                placa: newVehiculo.placa,
                anio: newVehiculo.anio,
                kilometraje: newVehiculo.kilometraje,
                valorDia: newVehiculo.valorDia,
                color: newVehiculo.color,
            })], { type: "application/json" })
        );
    
        try {
            const response = await fetch(`${API_BASE_URL}/vehiculos`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Error al agregar el vehículo');
            }

            await response.json(); 

            Swal.fire("Agregado", "El vehiculo ha sido agregado.", "success");
            handleCloseModal();
            setReload(!reload);
    
        } catch (error) { 
            Swal.fire("Error", "No se pudo agregar el vehículo.", "error");
        }
    };    

    const handleEliminarVehiculo = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"

        }).then(async (result) => {

            if (result.isConfirmed) {

                try {
                    const response = await fetch(`${API_BASE_URL}/vehiculos/${id}`, {
                        method: "DELETE",

                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error al eliminar el vehiculo');
                    }

                    Swal.fire(
                        "Eliminado",
                        "El vehiculo ha sido eliminado.",
                        "success"
                    );
                    setReload(!reload); 

                } catch (error) {
                    Swal.fire("Error", "No se pudo eliminar el vehiculo.", "error");
                }
            }
        });
    };

    if (loading) {
        return <div>Cargando vehiculos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="font-mono">
            <Header />
            <div className="flex">
                <Aside />
                <div>
                    <button id="agregar" onClick={handleAgregarVehiculo} className="bg-slate-700 text-white ml-[60rem] mt-10 p-2 rounded-lg duration-200 hover:scale-110">Agregar</button>
                    <table id="tabla" className="m-10 w-full text-center">
                        <thead className="bg-slate-700 h-12 text-white">
                            <tr>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Placa</th>
                                <th>Año</th>
                                <th>Km</th>
                                <th>Precio(dia)</th>
                                <th>Color</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {vehiculos.map((vehiculo) => (
                                <tr key={vehiculo.id}>
                                    <td>{vehiculo.marca}</td>
                                    <td>{vehiculo.modelo}</td>
                                    <td>{vehiculo.placa}</td>
                                    <td>{vehiculo.anio}</td>
                                    <td>{vehiculo.kilometraje} km</td>
                                    <td>{vehiculo.valorDia} $</td>
                                    <td>{vehiculo.color}</td>
                                    <td>
                                        <button id="eliminar" className="bg-red-700 text-white rounded-lg p-1 mr-2" onClick={() => handleEliminarVehiculo(vehiculo.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2 className="m-2">Agregar Vehículo</h2>
                        <form onSubmit={handleSubmit}>
                            <select
                                value={newVehiculo.modelo}
                                onChange={(e) => setNewVehiculo({ ...newVehiculo, modelo: e.target.value })}
                                required
                                className="m-2"
                            >
                                <option value="">Selecciona un modelo</option>
                                {modelos.map((modelo) => (
                                    <option key={modelo.id} value={modelo.id}>{modelo.modelo}</option>
                                ))}
                            </select>

                            <input
                                id="add"
                                placeholder="Placa"
                                type="text"
                                value={newVehiculo.placa}
                                onChange={(e) => setNewVehiculo({ ...newVehiculo, placa: e.target.value })}
                                required
                            />

                            <input
                                id="add"
                                placeholder="Año"
                                type="text"
                                value={newVehiculo.anio}
                                onChange={(e) => setNewVehiculo({ ...newVehiculo, anio: e.target.value })}
                                required
                            />

                            <input
                                id="add"
                                placeholder="Kilometraje"
                                type="text"
                                value={newVehiculo.kilometraje}
                                onChange={(e) => setNewVehiculo({ ...newVehiculo, kilometraje: e.target.value })}
                                required
                            />

                            <input
                                id="add"
                                placeholder="Precio(dia)"
                                type="text"
                                value={newVehiculo.valorDia}
                                onChange={(e) => setNewVehiculo({ ...newVehiculo, valorDia: e.target.value })}
                                required
                            />

                            <input
                                id="add"
                                placeholder="Color"
                                type="text"
                                value={newVehiculo.color}
                                onChange={(e) => setNewVehiculo({ ...newVehiculo, color: e.target.value })}
                                required
                            />

                            <input
                                id="add"
                                placeholder="Imagen"
                                type="file"
                                onChange={(e) => setNewVehiculo({ ...newVehiculo, foto: e.target.files[0] })}
                                required
                            />

                            <button id="agregar" type="submit" className="bg-slate-700 text-white p-2 rounded-lg">Guardar</button>
                            <button id="cancelar" type="button" onClick={handleCloseModal} className="bg-gray-500 text-white p-2 rounded-lg ml-2">Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default adminVehiculos;