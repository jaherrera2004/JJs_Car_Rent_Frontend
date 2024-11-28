import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function headerAdmin() {

    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');

    let decodedToken;

    try {
        decodedToken = jwtDecode(accessToken);

    } catch (error) {
        console.error('Error al decodificar el token:', error);
        setErrorMessage('Error al decodificar el token. Inténtalo de nuevo.');
        return;
    }

    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        console.error('El token ha expirado');
        navigate("/sesion"); 
        return;
    }

    const user = decodedToken.sub;
   
    return <header className="font-mono">
        <section className="flex bg-slate-400 p-8 justify-start text-lg space-x-[60rem]">
            <h1 className="text-white">Panel de Administrador</h1>
            <h1 className="text-white">Admin: {user}</h1>
        </section>
    </header>;
};

export default headerAdmin;