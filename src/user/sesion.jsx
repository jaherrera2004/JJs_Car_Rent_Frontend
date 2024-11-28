import '../css/sesion.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../js/APIconfig.js";
import { jwtDecode } from "jwt-decode";

function sesion() { 

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        usuario: '',
        contrasenia: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleCharge = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const jsonData = JSON.stringify(formData);

        try {
            const response = await fetch(`${API_BASE_URL}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: jsonData
            });

            if (response.ok) {
                const result = await response.json();
                const accessToken = result.accessToken;
                localStorage.setItem('accessToken', accessToken);

                let decodedToken;

                try {
                    decodedToken = jwtDecode(accessToken);

                } catch (error) {
                    console.error('Error al decodificar el token:', error);
                    setErrorMessage('Error al decodificar el token. Inténtalo de nuevo.');
                    return;
                }

                if (decodedToken.rol === "Admin") {
                    navigate("/adminDashboard");
                    
                } else {
                    navigate("/");
                }

                setFormData({
                    usuario: '',
                    contrasenia: ''
                });

            } else {
                setErrorMessage('Usuario o contraseña incorrectos');
                console.error('Error al iniciar sesión:', response.statusText);
            }

        } catch (error) {
            setErrorMessage('Error al enviar los datos. Intente de nuevo.');
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <section id="registro" className="flex bg-cover bg-center p-20 items-center justify-center">
            <div className="flex flex-col justify-center p-10 bg-inherit rounded-lg backdrop-blur-md w-96 h-96"> 
                <h2 id="titulo-sesion" className="text-white text-2xl text-center">INICIAR SESIÓN</h2>
                <img src="src/assets/user-solid.svg" alt="" className="m-2 p-2 h-24" />
                <form onSubmit={handleSubmit} className="text-center flex-col flex">
                    <input 
                        type="text" 
                        className="p-2 rounded-lg m-2 outline-none" 
                        name="usuario" 
                        placeholder="Nombre de Usuario" 
                        value={formData.usuario} 
                        onChange={handleCharge} 
                    />
                    
                    <input 
                        type="password" 
                        className="p-2 rounded-lg m-2 outline-none" 
                        name="contrasenia" 
                        placeholder="Contraseña" 
                        value={formData.contrasenia} 
                        onChange={handleCharge}
                    />
                   
                   <button id="bsesion" type="submit" className="bg-blue-600 text-white rounded-lg mt-5 p-2 duration-200 hover:scale-105 mb-2"> Iniciar Sesión </button>
                   {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </form>
            </div>
        </section>
    );
}

export default sesion;
