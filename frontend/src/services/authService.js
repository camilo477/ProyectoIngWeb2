import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/accounts/";

export const register = async (email, username, password) => {
    try {
        const response = await axios.post(`${API_URL}register/`, {
            email,
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error en el registro";
    }
};
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}login/`, {
            email,
            password,
        });
        return response.data; 
    } catch (error) {
        throw error.response?.data || "Error en el inicio de sesión";
    }
};