import { useEffect, useState } from "react";
import "../css/admin.css";
import "../css/aside.css";
import Header from '../other/headerAdmin.jsx';
import Aside from '../other/aside.jsx';
import API_BASE_URL from "../js/APIconfig.js";
import Swal from 'sweetalert2';


function adminModelos() {


    const [modelos, setModelos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newModelo, setNewModelo] = useState({ modelo: "", marca: "", tipo: "" });
    const [reload, setReload] = useState(false); 
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {

        const fetchModelos = async () => {

            try {
                setLoading(true);
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

        const fetchMarcas = async () => {

            try {
                const response = await fetch(`${API_BASE_URL}/marcas`, {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }

                const data = await response.json();
                setMarcas(data);

            } catch (err) {
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        const fetchTipos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/tipo-vehiculos`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los tipos de vehiculo');
                }

                const data = await response.json();
                setTipos(data);

            } catch (err) {
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        fetchTipos();
        fetchMarcas();
        fetchModelos();
    }, [accessToken, reload]);

    const handleAgregarModelo = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewModelo({ modelo: "", marca: "", tipo: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const modeloData = {
            modelo: newModelo.modelo,
            idMarca: newModelo.marca,
            idTipoVehiculo: newModelo.tipo,
        };
    
        try {
            const response = await fetch(`${API_BASE_URL}/modelos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(modeloData),
            });
    
            if (!response.ok) {
                throw new Error('Error al agregar el modelo');
            }
    
            await response.json();
    
            Swal.fire("Agregado", "El modelo ha sido agregado.", "success");
            handleCloseModal();
            setReload(!reload);
    
        } catch (error) {
            Swal.fire("Error", "No se pudo agregar el modelo.", "error");
        }
    };
    

    const handleEliminarModelo = (id) => {
        
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
                    const response = await fetch(`${API_BASE_URL}/modelos/${id}`, {
                        method: "DELETE",

                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error al eliminar el modelo');
                    }

                    Swal.fire(
                        "Eliminado",
                        "El modelo ha sido eliminado.",
                        "success"
                    );

                    setReload(!reload);

                } catch (error) {
                    Swal.fire("Error", "No se pudo eliminar el modelo.", "error");
                }
            }
        });
    };

    if (loading) {
        return <div>Cargando modelos...</div>;
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
                    <button id="agregar" onClick={handleAgregarModelo} className="bg-slate-700 text-white ml-[60rem] mt-10 p-2 rounded-lg duration-200 hover:scale-110">Agregar</button>
                    <table id="tabla" className="m-10 w-full text-center">
                        <thead className="bg-slate-700 h-12 text-white">
                            <tr>
                                <th>Id</th>
                                <th>Modelo</th>
                                <th>Marca</th>
                                <th>Tipo Vehículo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {modelos.map((modelo) => (
                                <tr key={modelo.id}>
                                    <td>{modelo.id}</td>
                                    <td>{modelo.modelo}</td>
                                    <td>{modelo.marca}</td>
                                    <td>{modelo.tipoVehiculo}</td>
                                    <td>
                                        <button id="eliminar" className="bg-red-700 text-white rounded-lg p-1 mr-2" onClick={() => handleEliminarModelo(modelo.id)}>Eliminar</button>
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
                        <h2 className="m-2">Agregar Modelo</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                id="add"
                                placeholder="Modelo"
                                type="text"
                                value={newModelo.modelo}
                                onChange={(e) => setNewModelo({ ...newModelo, modelo: e.target.value })}
                                required
                            />

                            <select
                                value={newModelo.marca}
                                onChange={(e) => setNewModelo({ ...newModelo, marca: e.target.value })}
                                required
                                className="m-2"
                            >
                                <option value="">Selecciona una marca</option>
                                {marcas.map((marca) => (
                                    <option key={marca.id} value={marca.id}>{marca.marca}</option>
                                ))}
                            </select>

                            <select
                                value={newModelo.tipo}
                                onChange={(e) => setNewModelo({ ...newModelo, tipo: e.target.value })}
                                required
                                className="m-2"
                            >
                                <option value="">Selecciona un tipo</option>
                                {tipos.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
                                ))}
                            </select>

                            <button id="agregar" type="submit" className="bg-slate-700 text-white p-2 rounded-lg">Guardar</button>
                            <button id="cancelar" type="button" onClick={handleCloseModal} className="bg-gray-500 text-white p-2 rounded-lg ml-2">Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default adminModelos;