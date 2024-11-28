import '../css/reservasUser.css';
import { motion } from "framer-motion";
import Header from '../other/header.jsx';
import Footer from '../other/footer.jsx';
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
import API_BASE_URL from "../js/APIconfig.js";

function reservasUser() {

    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModalDetalles, setShowModalDetalles] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [reload, setReload] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(accessToken);
    const id = decodedToken.userId;

    useEffect(() => {

        const fetchReservas = async () => {

            try {
                setLoading(true);

                const response = await fetch(`${API_BASE_URL}/reservas/usuario/${id}`, {

                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
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

    }, [accessToken, reload, id]);

    const handleCloseModalDetalles = () => {
        setShowModalDetalles(false);
    };

    const handleVerDetalles = (reservaId) => {
        const reservaSeleccionada = reservas.find(reserva => reserva.id === reservaId);
        setSelectedReserva(reservaSeleccionada);
        setShowModalDetalles(true);
    };

    if (loading) {
        return <div>Cargando mascotas...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <section className='bg-[#16161a] flex justify-center items-center h-screen'>
                <div className='bg-[#72757e] w-full rounded-lg p-10 m-20 ml-40 mr-40 flex flex-col'>
                    <div className='flex mb-10 justify-between'>
                        <h2 id='reservas' className='text-[#fffffe] text-4xl font-bold'>Mis Reservas</h2>
                    </div>

                    <div className='grid grid-cols-3'>
                        {reservas.map((reserva) => (
                            <div key={reserva.id} className='bg-white rounded-lg w-56 h-min m-10'>
                                <h2 id='titulo-reserva' className='text-black text-2xl m-5'>Reserva {reserva.id}</h2>
                                <button onClick={() => handleVerDetalles(reserva.id)}
                                    id='registrarse' className='bg-[#7f5af0] p-1 ml-5 text-white
                                rounded-lg duration-150 hover:scale-105 w-28 mb-5'>Ver Detalles</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {showModalDetalles && selectedReserva && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="modal-detalle-reserva">
                    <div className="modal-content-reserva">
                        <h2 id='titulo-reserva' className="m-5 text-start text-xl">Detalles de Reserva</h2>
                        <ul>
                            <li><h3 id='detalle-reserva' className='m-5'>ID Reserva: {selectedReserva.id}</h3></li>
                            <li><h3 id='detalle-reserva' className='m-5'>Cedula: {selectedReserva.cedula}</h3></li>
                            <li><h3 id='detalle-reserva' className='m-5'>Placa de Vehiculo: {selectedReserva.placaVehiculo}</h3></li>
                            <li><h3 id='detalle-reserva' className='m-5'>Fecha de Reserva: {selectedReserva.fechaInicio}</h3></li>
                            <li><h3 id='detalle-reserva' className='m-5'>Fecha de Entrega: {selectedReserva.fechaEntrega}</h3></li>
                            <li><h3 id='detalle-reserva' className='m-5'>Estado: {selectedReserva.estado}</h3></li>
                        </ul>
                        <button type="button" onClick={handleCloseModalDetalles} 
                        className="bg-gray-500 text-white ml-5 w-28 p-2 rounded-lg 
                        hover:bg-gray-600 duration-200 hover:scale-110">Salir</button>
                    </div>
                </motion.div>
            )}
            <Footer />
        </>
    );
};

export default reservasUser;