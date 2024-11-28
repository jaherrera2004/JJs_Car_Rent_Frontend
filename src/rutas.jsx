import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './user/App.jsx';
import Registro from './user/registro.jsx';
import Sesion from './user/sesion.jsx';
import Vehiculos from './user/vehiculos.jsx';
import ReservasUser from './user/reservasUser.jsx';
import AdminDashboard from './admin/adminDashboard.jsx';
import AdminUsers from './admin/adminUsers.jsx';
import AdminTipos from './admin/adminTipos.jsx';
import AdminMarcas from './admin/adminMarcas.jsx';
import AdminModelos from './admin/adminModelos.jsx';
import AdminVehiculos from './admin/adminVehiculos.jsx';
import AdminReservas from './admin/adminReservas.jsx';
import AdminFacturas from './admin/adminFacturas.jsx';

function rutas() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/sesion" element={<Sesion />} />
                <Route path="/vehiculos" element={<Vehiculos />} />
                <Route path="/reservasUser" element={<ReservasUser />} />
                <Route path="/adminDashboard" element={<AdminDashboard />} />
                <Route path="/adminUsers" element={<AdminUsers />} />
                <Route path="/adminTipos" element={<AdminTipos />} />
                <Route path="/adminMarcas" element={<AdminMarcas />} />
                <Route path="/adminModelos" element={<AdminModelos />} />
                <Route path="/adminVehiculos" element={<AdminVehiculos />} />
                <Route path="/adminReservas" element={<AdminReservas />} />
                <Route path="/adminFacturas" element={<AdminFacturas />} />
            </Routes>
        </Router>
    );
};

export default rutas;