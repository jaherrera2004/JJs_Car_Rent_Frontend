import '../css/header.css';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function header() {

    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {

            try {
                const decodedToken = jwtDecode(accessToken);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    console.error('El token ha expirado');
                    localStorage.removeItem('accessToken');
                    navigate("/sesion");

                } else {
                    setUser(decodedToken.sub);
                }

            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        }

    }, [navigate]);

    return <header className='h-28 flex bg-[#16161a] p-8 text-lg items-center gap-10 justify-end'>
        <div className='flex mr-[48rem]'>
            <Link to="/">
                <button className='items-center flex'>
                    <img src="src/assets/jj_s_car_rent-removebg-preview.png" alt="" className='h-36 p-5 duration-200 hover:scale-110' />
                </button>
            </Link>

        </div>

        <li>
            <Link to="/">
                <button className='text-[#fffffe] duration-200 hover:scale-125'> Inicio </button>
            </Link>
        </li>

        <li>
            <button className="text-[#fffffe] duration-200 hover:scale-125"> Servicios </button>
        </li>

        <div>
            {user ? (
                <ul id='menu'>
                    <li>
                        <button
                            id='registrarse'
                            className='text-[#fffffe] bg-[#7f5af0] rounded-lg p-2 
                                    duration-150 border-2 border-white hover:scale-105 w-36' onClick={toggleMenu}>{user}
                        </button>

                        {isOpen && (
                            <ul className="bg-white">
                                <li>
                                    <button id='headertext' onClick={() => navigate('/reservasUser')} className='text-[#001858] 
                                                p-2 w-36 hover:bg-slate-200 mt-2 mb-2'>Mis Reservas</button>
                                </li>

                                <li>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('accessToken'); 
                                            setUser(null); 
                                            navigate('/');
                                            window.location.reload(); 
                                        }}
                                        id='registrarse'
                                        className='bg-[#7f5af0] text-lg p-2 text-[#fffffe] w-36'>
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>

            ) : (
                <ul className='flex'>

                    <li>
                        <button id='registrarse' className='bg-[#7f5af0] text-[#fffffe] rounded-lg p-2 duration-150
                                     hover:scale-105 w-max border-2 border-white' onClick={() => navigate('/sesion')}>Iniciar Sesión</button>
                    </li>
                </ul>
            )}

        </div>

    </header>;
};

export default header;