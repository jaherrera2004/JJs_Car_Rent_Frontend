import API_BASE_URL from "../js/APIconfig.js";
import Header from '../other/headerAdmin.jsx';
import Aside from '../other/aside.jsx';
import { useEffect, useState } from "react";

function Reservas() {
    
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);  
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {

        const fetchReservas = async () => {

            try {
                setLoading(true);
                
                const response = await fetch(`${API_BASE_URL}/reservas`, {

                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener las reservas');
                }

                const data = await response.json();
                setReservas(data);

            } catch (err) {
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, [accessToken, reload]);  

    if (loading) {
        return <div>Cargando reservas...</div>;
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
                    <table id="tabla" className="m-10 text-center w-full">
                        <thead className="bg-slate-700 h-12 text-white">
                            <tr>
                                <th>Id</th>
                                <th>Placa Vehiculo </th>
                                <th>Cedula Usuario</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Entrega</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservas.map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.id}</td>
                                    <td>{reserva.placaVehiculo}</td>
                                    <td>{reserva.cedula}</td>
                                    <td>{reserva.fechaInicio}</td>
                                    <td>{reserva.fechaEntrega}</td>
                                    <td>{reserva.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Reservas;