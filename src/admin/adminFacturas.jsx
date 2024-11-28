import API_BASE_URL from "../js/APIconfig.js";
import Header from '../other/headerAdmin.jsx';
import Aside from '../other/aside.jsx';
import { useEffect, useState } from "react";

function Facturas() {
    
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);  
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {

        const fetchFacturas = async () => {

            try {
                setLoading(true);
                
                const response = await fetch(`${API_BASE_URL}/facturas`, {

                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener las facturas');
                }

                const data = await response.json();
                setFacturas(data);

            } catch (err) {
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        fetchFacturas();
    }, [accessToken, reload]);  

    if (loading) {
        return <div>Cargando facturas...</div>;
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
                                <th>Valor </th>
                                <th>Fecha</th>
                                <th>Id Reserva</th>
                            </tr>
                        </thead>

                        <tbody>
                            {facturas.map((factura) => (
                                <tr key={factura.id}>
                                    <td>{factura.id}</td>
                                    <td>$ {factura.valor}</td>
                                    <td>{factura.fecha}</td>
                                    <td>{factura.idReserva}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Facturas;