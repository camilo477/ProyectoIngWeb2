import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (response && response.access) {
                alert("Inicio de sesión exitoso");
                localStorage.setItem("token", response.access);
                navigate("/main"); 
            } else {
                alert("Error en el inicio de sesión");
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            alert(`Error en el inicio de sesión: ${JSON.stringify(error.response?.data || error, null, 2)}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-200">
                <h2 className="text-3xl font-bold mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-left font-semibold">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-left font-semibold">Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition font-semibold"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
