import "../css/admin.css";
import "../css/aside.css";
import Header from '../other/headerAdmin.jsx';
import Aside from '../other/aside.jsx';
import API_BASE_URL from "../js/APIconfig.js";
import { useEffect, useState } from "react";

function adminDashboard() {

    const [dashboard, setDashboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${API_BASE_URL}/dashboard`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos del dashboard');
                }

                const data = await response.json();
                console.log("Respuesta de la API:", data); // Agregado para depurar
                setDashboard(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [accessToken, reload]);


    if (loading) {
        return <div>Cargando dashboard...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="font-mono">
            <Header />
            <div className="flex">
                <Aside />
                <div className="grid grid-cols-2 p-10">
                    {dashboard && (
                        <>
                            <div className="bg-slate-400 h-56 w-[30rem] mr-10 mb-10 rounded-lg">
                                <h2 className="text-white p-10 text-2xl">Total de Vehículos: {dashboard.totalVehiculos}</h2>
                            </div>
                            <div className="bg-slate-400 h-56 w-[30rem] mb-10 rounded-lg">
                                <h2 className="text-white p-10 text-2xl">Total de Reservas: {dashboard.totalReservas}</h2>
                            </div>
                            <div className="bg-slate-400 h-56 w-[30rem] mb-10 rounded-lg">
                                <h2 className="text-white p-10 text-2xl">Total Ganancias: {dashboard.totalGanancias}</h2>
                            </div>
                            <div className="bg-slate-400 h-56 w-[30rem] mb-10 rounded-lg">
                                <h2 className="text-white p-10 text-2xl">Usuarios Registrados: {dashboard.totalClientes}</h2>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </section>
    );
};

export default adminDashboard;