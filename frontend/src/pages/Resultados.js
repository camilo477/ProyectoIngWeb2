import React, { useEffect, useState } from "react";

const GOOGLE_SHEET_ID = "19yvqEm9E67t2roP4SSpGRw7kWH40Uhpc55r27ajyIZ0";
const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;

const Resultados = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(GOOGLE_SHEET_URL);
                const text = await response.text();

                if (!text.startsWith("/*O_o*/")) {
                    throw new Error("Formato inesperado en la respuesta");
                }

                const jsonText = text.substring(47, text.length - 2); 
                const data = JSON.parse(jsonText);

                if (!data.table || !data.table.rows) {
                    throw new Error("No se encontraron datos en la hoja de cálculo");
                }

                const rows = data.table.rows.map(row => row.c.map(cell => cell?.v || ""));
                setDatos(rows);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">📊 Resultados del Formulario</h2>

            {loading ? (
                <div className="flex justify-center">
                    <p className="text-gray-500 text-lg">Cargando datos...</p>
                </div>
            ) : error ? (
                <div className="flex justify-center">
                    <p className="text-red-500 text-lg">⚠️ Error: {error}</p>
                </div>
            ) : datos.length === 0 ? (
                <div className="flex justify-center">
                    <p className="text-gray-500 text-lg">No hay datos disponibles.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="w-full border border-gray-300 bg-white rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                {datos[0].map((header, index) => (
                                    <th key={index} className="border px-6 py-3 text-left">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {datos.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-100 transition-all">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border px-6 py-3">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Resultados;
