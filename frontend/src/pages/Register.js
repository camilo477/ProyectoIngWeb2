import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await register(email, username, password);
            console.log("Registro exitoso:", response);
            alert("Registro exitoso");
            navigate("/login"); 
        } catch (error) {
            console.error("Error en el registro:", error);
            alert(`Error en el registro: ${JSON.stringify(error.response?.data || error, null, 2)}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600">
            <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-200">
                <h2 className="text-3xl font-bold mb-4">Registro</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-left font-semibold">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-left font-semibold">Usuario:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-left font-semibold">Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition font-semibold"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
