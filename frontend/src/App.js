import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Main from "./pages/Main"; 
import Resultados from "./pages/Resultados"; // Corrección aquí

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<Main />} />
                <Route path="/resultados" element={<Resultados />} />
            </Routes>
        </Router>
    );
}

export default App;
