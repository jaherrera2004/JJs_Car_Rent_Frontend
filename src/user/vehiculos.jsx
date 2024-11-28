import '../css/vehiculos.css';
import { motion } from 'framer-motion';
import Header from '../other/header.jsx';
import Footer from '../other/footer.jsx';
import { useEffect, useState } from "react";
import API_BASE_URL from "../js/APIconfig.js";
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";

function Vehiculos() {

    const [tipos, setTipos] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedVehiculo, setSelectedVehiculo] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(accessToken);
    const id = decodedToken.userId;

    useEffect(() => {

        const today = new Date().toISOString().split('T')[0];
        document.getElementById("fechaInicio").setAttribute("min", today);
        document.getElementById("fechaEntrega").setAttribute("min", today);

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
            }
        };

        const fetchVehiculos = async () => {

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_BASE_URL}/vehiculos/fotos`, {

                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los vehículos');
                }

                const data = await response.json();
                setVehiculos(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTipos();
        fetchVehiculos();

    }, [accessToken]);

    const buscarVehiculos = async () => {

        if (!selectedTipo || !fechaInicio || !fechaEntrega) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        setLoading(true);
        setError(null);

        try {

            const response = await fetch(`${API_BASE_URL}/vehiculos/disponibles?idTipoVehiculo=${selectedTipo}&fechaInicio=${fechaInicio}&fechaFin=${fechaEntrega}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los vehículos disponibles');
            }

            const data = await response.json();
            setVehiculos(data);

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    const handleShowModal = (vehiculo) => {

        setSelectedVehiculo(vehiculo);
        setShowModal(true);
    };

    const handleCloseModal = () => {

        setShowModal(false);
        setSelectedVehiculo(null);
    };

    const handleReservar = async () => {
  
        if (!accessToken || !id) {

            Swal.fire({
                icon: 'warning',
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para realizar una reserva.',
                confirmButtonText: 'Iniciar Sesión',

            }).then((result) => {

                if (result.isConfirmed) {
   
                    window.location.href = '/login';
                }
            });

            return;
        }
    
        if (!fechaInicio || !fechaEntrega) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, complete todos los campos.',
            });

            return;
        }
    
        const reservaData = {

            idUsuario: id,
            idVehiculo: selectedVehiculo.vehiculoInfo.id,
            fechaInicio,
            fechaEntrega,
        };
    
        try {

            const response = await fetch(`${API_BASE_URL}/reservas`, {

                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },

                body: JSON.stringify(reservaData),
            });
    
            if (!response.ok) {
                throw new Error('Error al realizar la reserva');
            }
    
            Swal.fire({
                icon: 'success',
                title: 'Reserva Exitosa',
                text: 'Tu reserva ha sido realizada correctamente.',
            });
    
            handleCloseModal();
    
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al realizar la reserva.',
            });
        }
    };

    return (

        <section className='bg-[#16161a] h-screen'>

            <Header />

            <div id="filtro" className='m-10 flex items-center'>
                <select
                    value={selectedTipo}
                    onChange={(e) => setSelectedTipo(e.target.value)}
                    className='m-5 bg-[#16161a] text-[#fffffe]'
                >
                    <option disabled selected>Seleccione un Tipo de Vehículo</option>
                    {tipos.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>{tipo.tipo}</option>
                    ))}
                </select>

                <form>
                    <label htmlFor="" className='text-[#fffffe]'> Fecha de Reserva:
                        <input
                            id="fechaInicio"
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            className='bg-[#16161a] text-[#fffffe] ml-2 mr-2'
                        />
                    </label>

                    <label htmlFor="" className='text-[#fffffe]'> Fecha de Entrega:
                        <input
                            id="fechaEntrega"
                            type="date"
                            value={fechaEntrega}
                            onChange={(e) => setFechaEntrega(e.target.value)}
                            className='bg-[#16161a] text-[#fffffe] ml-2'
                        />
                    </label>

                    <button
                        id='registrarse'
                        type="button"
                        onClick={buscarVehiculos}
                        className="text-[#fffffe] bg-[#7f5af0] rounded-lg border-2 p-2 text-lg duration-150 hover:scale-105 ml-10 w-32"
                    >
                        Buscar
                    </button>
                </form>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p className="text-[#fffffe]">Cargando...</p>
            ) : (
                <button>
                    <div className='grid pb-10 pl-10 pr-10 gap-5 justify-center grid-cols-4'>
                        {vehiculos.map(({ base64Image, mediaType, vehiculoInfo }) => (
                            <div
                                key={vehiculoInfo.id}
                                className="bg-[#72757e] text-left hover:scale-105 duration-150"
                                onClick={() => handleShowModal({ base64Image, mediaType, vehiculoInfo })}
                            >
                                <img
                                    src={`data:${mediaType};base64,${base64Image}`}
                                    alt={`${vehiculoInfo.marca} ${vehiculoInfo.modelo}`}
                                    className='h-72'
                                />
                                <h3 id="vehiculo" className='text-[#fffffe] p-2 text-xl'>{vehiculoInfo.placa}</h3>
                                <p className='text-white p-2'>{vehiculoInfo.valorDia.toLocaleString()} $</p>
                            </div>
                        ))}
                    </div>
                </button>

            )}

            {showModal && selectedVehiculo && (
                <motion.div
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-[#242629] rounded-lg p-10 w-[60rem] flex relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 m-2 text-[#fffffe] p-2 text-2xl duration-200 hover:scale-125"
                        >
                            X
                        </button>
                        <div className="flex">
                            <img
                                src={`data:${selectedVehiculo.mediaType};base64,${selectedVehiculo.base64Image}`}
                                alt={`${selectedVehiculo.vehiculoInfo.marca} ${selectedVehiculo.vehiculoInfo.modelo}`}
                                className="h-[300px] w-[400px]"
                            />

                            <div className="pl-10 flex flex-col justify-start">
                                <h2 className="text-3xl text-[#fffffe] font-bold mb-2">{selectedVehiculo.vehiculoInfo.marca}</h2>
                                <h3 className="text-[#fffffe] text-xl mb-2">{selectedVehiculo.vehiculoInfo.modelo}</h3>
                                <h3 className="text-[#fffffe] text-xl mb-2">{selectedVehiculo.vehiculoInfo.placa}</h3>
                                <h3 className="text-[#fffffe] text-xl mb-2">{selectedVehiculo.vehiculoInfo.anio}</h3>
                                <h3 className="text-[#fffffe] text-xl mb-2">{selectedVehiculo.vehiculoInfo.kilometraje} km</h3>
                                <h3 className="text-[#fffffe] text-xl mb-4"> $ {selectedVehiculo.vehiculoInfo.valorDia} x día</h3>
                                <button
                                    id='registrarse'
                                    onClick={handleReservar}
                                    className="text-[#fffffe] bg-[#7f5af0] rounded-lg border-2 p-2 text-lg duration-150 hover:scale-105"
                                >
                                    Reservar
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            <Footer />

        </section>
    );
};

export default Vehiculos;
