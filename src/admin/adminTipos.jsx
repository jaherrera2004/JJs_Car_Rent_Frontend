import { useEffect, useState } from "react";
import "../css/admin.css";
import "../css/aside.css";
import Header from '../other/headerAdmin.jsx';
import Aside from '../other/aside.jsx';
import API_BASE_URL from "../js/APIconfig.js";
import Swal from 'sweetalert2';

function adminTipos() {

    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newTipo, setNewTipo] = useState({ tipo: "", descripcion: "" });
    const [reload, setReload] = useState(false);  
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {

        const fetchTipos = async () => {

            try {
                setLoading(true);
                
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
    }, [accessToken, reload]);  

    const handleAgregarTipo = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewTipo({ tipo: "", descripcion: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/tipo-vehiculos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newTipo),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el tipo de vehiculo');
            }

            await response.json(); 

            Swal.fire("Agregado", "El tipo de vehiculo ha sido agregado.", "success");
            handleCloseModal();
            setReload(!reload);

        } catch (error) {
            Swal.fire("Error", "No se pudo agregar el tipo de vehiculo.", "error");
        }
    };

    const handleEliminarTipo = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará los modelos y vehículos que pertenezcan a este tipo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {
                    const response = await fetch(`${API_BASE_URL}/tipo-vehiculos/${id}`, {
                        method: "DELETE",
                        
                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error al eliminar el tipo de vehiculo');
                    }

                    Swal.fire("Eliminado", "El tipo de vehiculo ha sido eliminado.", "success");
                    setReload(!reload);  

                } catch (error) {
                    Swal.fire("Error", "No se pudo eliminar el tipo de vehiculo.", "error");
                }
            }
        });
    };

    if (loading) {
        return <div>Cargando tipos de vehiculo...</div>;
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
                    <button id="agregar" onClick={handleAgregarTipo} className="bg-slate-700 text-white ml-[60rem] mt-10 p-2 rounded-lg 
                    duration-200 hover:scale-110">Agregar</button>

                    <table id="tabla" className="m-10 text-center w-full">
                        <thead className="bg-slate-700 h-12 text-white">
                            <tr>
                                <th>Id</th>
                                <th>Tipo </th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tipos.map((tipo) => (
                                <tr key={tipo.id}>
                                    <td>{tipo.id}</td>
                                    <td>{tipo.tipo}</td>
                                    <td>{tipo.descripcion}</td>
                                    <td>
                                        <button className="bg-red-700 text-white rounded-lg p-1 mr-2 hover:bg-red-800" onClick={() => handleEliminarTipo(tipo.id)}>Eliminar</button>
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
                        <h2 className="p-5">Agregar Tipo de Vehículo</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                id="add"
                                placeholder="Tipo"
                                type="text"
                                value={newTipo.tipo}
                                onChange={(e) => setNewTipo({ ...newTipo, tipo: e.target.value })}
                                required
                            />
                            <input
                                id="add"
                                placeholder="Descripción"
                                type="text"
                                value={newTipo.descripcion}
                                onChange={(e) => setNewTipo({ ...newTipo, descripcion: e.target.value })}
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

export default adminTipos;
