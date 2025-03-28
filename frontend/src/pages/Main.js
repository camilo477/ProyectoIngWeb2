import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Main = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded); // Aquí guardamos la info del usuario
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                setUser(null);
            }
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Bienvenido</h1>
                {user ? (
                    <p className="text-lg">Usuario: {user.username || "No disponible"}</p>
                ) : (
                    <p className="text-lg text-gray-500">Cargando...</p>
                )}
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Mostrar Información
                </button>
            </div>
        </div>
    );
};

export default Main;
