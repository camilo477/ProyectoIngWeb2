import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="bg-white text-gray-800 p-10 rounded-3xl shadow-2xl max-w-md text-center">
                <h1 className="text-4xl font-extrabold mb-4">¡Bienvenido!</h1>
                <p className="text-lg mb-6">Accede a tu cuenta o regístrate para empezar.</p>
                <div className="flex justify-center space-x-4">
                    <Link 
                        to="/login" 
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition font-semibold"
                    >
                        Iniciar Sesión
                    </Link>
                    <Link 
                        to="/register" 
                        className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition font-semibold"
                    >
                        Registrarse
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

