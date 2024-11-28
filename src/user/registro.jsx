import '../css/registro.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, json } from 'react-router-dom';
import API_BASE_URL from "../js/APIconfig.js";

function registro() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        cedula: '',
        telefono: '',
        email: '',
        username: '',
        contrasenia: ''
    });

    const handleCharge = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        const jsonData = JSON.stringify(formData);

        try {

            const response = await fetch(`${API_BASE_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: jsonData
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                setFormData({
                    nombre: '',
                    apellido: '',
                    edad: '',
                    cedula: '',
                    telefono: '',
                    email: '',
                    username: '',
                    contrasenia: ''
                });

            } else {
                console.error('Error en el registro:', response.statusText);
            }
            
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }

        navigate("/sesion");
    };

    return (
        <section id="registro" className="flex bg-cover bg-center items-center justify-center">
            <div className="justify-center p-10 bg-inherit rounded-lg backdrop-blur-md">
                <h2 id="titulo-registro" className="text-white text-3xl p-5 text-center">REGISTRO</h2>
                <form onSubmit={handleSubmit} className="text-center grid grid-cols-2">
                    <input
                        type="text"
                        className="p-2 rounded-lg m-2 outline-none"
                        placeholder="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleCharge}
                    />

                    <input
                        type="text"
                        className="p-2 rounded-lg m-2 outline-none"
                        placeholder="Apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleCharge}
                    />

                    <input
                        type="number"
                        className="p-2 rounded-lg m-2 outline-none"
                        placeholder="Edad"
                        name="edad"
                        value={formData.edad}
                        onChange={handleCharge}
                    />

                    <input
                        type="number"
                        className="p-2 rounded-lg m-2 outline-none"
                        placeholder="Documento"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleCharge}
                    />

                    <input
                        type="number"
                        className="p-2 rounded-lg m-2 outline-none"
                        placeholder="Telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleCharge}
                    />

                    <input
                        type="email"
                        className="p-2 rounded-lg m-2 outline-none"
                        placeholder="Correo"
                        name="email"
                        value={formData.email}
                        onChange={handleCharge}
                    />

                    <input
                        type="text"
                        className="p-2 rounded-lg m-2 outline-none"
                        placeholder="Nombre de Usuario"
                        name="username"
                        value={formData.username}
                        onChange={handleCharge}
                    />

                    <input
                        type="password"
                        className="p-2 rounded-lg m-2 outline-none"
                        placeholder="Contraseña"
                        name="contrasenia"
                        value={formData.contrasenia}
                        onChange={handleCharge}
                    />
                </form>
                <button id="bregistro" type="submit" className="bg-blue-600 text-white w-full rounded-lg p-2 mt-5 duration-200 hover:scale-105">Registrarse</button>
            </div>
        </section>
    );
}

export default registro;
