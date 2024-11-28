import { useEffect, useState } from "react";
import "../css/admin.css";
import "../css/aside.css";
import Header from '../other/headerAdmin.jsx';
import Aside from '../other/aside.jsx';
import API_BASE_URL from "../js/APIconfig.js";
import Swal from 'sweetalert2';

function adminUsers() {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {

        const fetchUsuarios = async () => {

            try {
                const response = await fetch(`${API_BASE_URL}/usuarios`, {
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
                setUsuarios(data);

            } catch (err) {
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, [accessToken]);

    const handleEliminarUsuario = (id) => {
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
                    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
                        method: "DELETE",

                        headers: {
                            "Authorization": `Bearer ${accessToken}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error al eliminar el usuario');
                    }

                    setUsuarios(usuarios.filter(usuario => usuario.id !== id));

                    Swal.fire(
                        "Eliminado",
                        "El usuario ha sido eliminado.",
                        "success"
                    );

                } catch (error) {
                    Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
                }
            }
        });
    };

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="font-mono">
            <Header />
            <div className="flex">
                <Aside />
                <div className="w-full mr-20">
                    <table id="tabla" className="m-10 w-full text-center">
                        <thead className="bg-slate-700 h-12 text-white">
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Edad</th>
                                <th>Cedula</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>{usuario.edad}</td>
                                    <td>{usuario.cedula}</td>
                                    <td>{usuario.telefono}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.username}</td>
                                    <td>
                                        <button id="agregar" className="bg-slate-700 text-white rounded-lg p-1 mr-2">Ver Reservas</button>
                                        <button id="eliminar" className="bg-red-700 text-white rounded-lg p-1 mr-2" onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default adminUsers;
