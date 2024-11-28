import "../css/aside.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function aside() {

    return (
        <section className="font-mono">
            <aside className="bg-slate-400 w-60 h-full">
                <ul className=" text-white">
                    <li>
                        <Link to="/adminDashboard">
                            <button id="bboton" className="flex items-center w-full duration-200"> 
                                <img src="src/assets/house-solid.svg" alt="" className="h-10 mr-2 ml-5 mb-2 mt-2 p-2" /> Dashboard </button>
                        </Link>
                    </li>

                    <li>
                        <Link to="/adminUsers">
                            <button id="bboton" className="flex items-center w-full duration-200"> 
                                <img src="src/assets/users-solid.svg" alt="" className="h-10 mr-2 ml-5 mb-2 mt-2 p-2" /> Usuarios </button>
                        </Link>
                    </li>

                    <li>
                        <Link to="/adminTipos">
                            <button id="bboton" className="flex items-center w-full duration-200"> 
                                <img src="src/assets/truck-solid.svg" alt="" className="h-10 mr-2 ml-5 mb-2 mt-2 p-2" /> Tipos de Vehículo </button>
                        </Link>
                    </li>

                    <li>
                        <Link to ="/adminMarcas">
                            <button id="bboton" className="flex items-center w-full duration-200"> 
                                <img src="src/assets/tags-solid.svg" alt="" className="h-10 mr-2 ml-5 mb-2 mt-2 p-2" /> Marcas </button>
                        </Link>
                    </li>

                    <li>
                        <Link to ="/adminModelos">
                            <button id="bboton" className="flex items-center w-full duration-200"> 
                                <img src="src/assets/box-open-solid.svg" alt="" className="h-10 mr-2 ml-5 mb-2 mt-2 p-2" /> Modelos </button>
                        </Link>
                    </li>

                    <li>
                        <Link to ="/adminVehiculos">
                            <button id="bboton" className="flex items-center w-full duration-200"> 
                                <img src="src/assets/car-solid.svg" alt="" className="h-10 mr-2 ml-5 mb-2 mt-2 p-2" /> Vehículos </button>
                        </Link>
                    </li>

                    <li>
                        <Link to="/adminReservas">
                            <button id="bboton" className="flex items-center w-full duration-200"> 
                                <img src="src/assets/file-lines-solid.svg" alt="" className="h-10 mr-2 ml-5 mb-2 mt-2 p-2" /> Reservas </button>
                        </Link>
                    </li>

                    <li>
                        <Link to="/adminFacturas">
                            <button id="bboton" className="flex items-center w-full duration-200"> 
                                <img src="src/assets/receipt-solid.svg" alt="" className="h-10 mr-2 ml-5 mb-2 mt-2 p-2" /> Facturas </button>
                        </Link>   
                    </li>
                </ul>
            </aside>
        </section>
    );
};

export default aside;