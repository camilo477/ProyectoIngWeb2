import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600 text-white p-6">
            <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-2xl max-w-2xl w-full text-center border border-gray-200">
                <h1 className="text-4xl font-bold mb-4">Bienvenido a la Aplicación</h1>
                <p className="text-lg mb-6">
                    Esta plataforma te ayuda a analizar la rotación de empleados
                    mediante encuestas y análisis de datos.
                </p>
                <button
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition font-semibold"
                    onClick={() => navigate("/resultados")}
                >
                    Ver Resultados
                </button>
            </div>
        </div>
    );
};

export default Main;
