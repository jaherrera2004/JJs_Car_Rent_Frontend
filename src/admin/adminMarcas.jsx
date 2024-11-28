import { useEffect, useState } from "react";
import "../css/admin.css";
import "../css/aside.css";
import Header from '../other/headerAdmin.jsx';
import Aside from '../other/aside.jsx';
import API_BASE_URL from "../js/APIconfig.js";
import Swal from 'sweetalert2';

function adminMarcas() {

    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newMarca, setNewMarca] = useState({ marca: "", logo: "" });
    const [reload, setReload] = useState(false);  
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/marcas/logos`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener las marcas');
                }

                const data = await response.json();
                
                setMarcas(data);

            } catch (err) {
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        fetchMarcas();
    }, [accessToken, reload]);

    const handleAgregarMarca = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewMarca({ marca: "", logo: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("logo", newMarca.logo); 
        formData.append("data", new Blob([JSON.stringify({ marca: newMarca.marca })], { type: "application/json" }));
    
        try {
         
            const response = await fetch(`${API_BASE_URL}/marcas`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                body: formData, 
            });
    
            if (!response.ok) {
                throw new Error('Error al agregar la marca');
            }

            await response.json();

            Swal.fire("Agregado", "La marca ha sido agregada.", "success");
            handleCloseModal();
            setReload(!reload);
    
        } catch (error) {
            Swal.fire("Error", "No se pudo agregar la marca.", "error");
        }
    };
    
    const handleEliminarMarca = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará todos los modelos de esta marca",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${API_BASE_URL}/marcas/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error al eliminar la marca');
                    }

                    setMarcas(marcas.filter(marca => marca.marcaInfo.id !== id));

                    Swal.fire(
                        "Eliminado",
                        "La marca ha sido eliminada.",
                        "success"
                    );
                    setReload(!reload);

                } catch (error) {
                    Swal.fire("Error", "No se pudo eliminar la marca.", "error");
                }
            }
        });
    };

    if (loading) {
        return <div>Cargando marcas...</div>;
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
                    <button id="agregar" onClick={handleAgregarMarca} className="bg-slate-700 text-white ml-[60rem] mt-10 p-2 rounded-lg duration-200 hover:scale-110">Agregar</button>
                    <div className='grid p-10 gap-16 justify-center grid-cols-3'>
                        {marcas.map(({ marcaInfo, base64Image, mediaType }) => (
                            <div className="bg-slate-400 text-left w-80 h-max p-2" key={marcaInfo.id}>
                                <img src={`data:${mediaType};base64,${base64Image}`} alt={marcaInfo.marca} className='h-72' />
                                <h2 className='text-white p-2 text-xl'>Id: {marcaInfo.id}</h2>
                                <h2 className='text-white p-2 text-xl'>Marca: {marcaInfo.marca}</h2>
                                <button id="eliminar" className="bg-red-700 text-white rounded-lg p-1 mt-2" onClick={() => handleEliminarMarca(marcaInfo.id)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2 className="m-2">Agregar Marca</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                id="add"
                                placeholder="Marca"
                                type="text"
                                value={newMarca.marca}
                                onChange={(e) => setNewMarca({ ...newMarca, marca: e.target.value })}
                                required
                            />

                            <input
                                id="add"
                                placeholder="Logo"
                                type="file"
                                onChange={(e) => setNewMarca({ ...newMarca, logo: e.target.files[0] })}
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

export default adminMarcas;
