import React, { useEffect, useState } from "react";

const hojas = [
    {
        nombre: "Formulario 1",
        id: "19yvqEm9E67t2roP4SSpGRw7kWH40Uhpc55r27ajyIZ0"
    },
    {
        nombre: "Formulario 2",
        id: "13AvwBdXylf1Mf56RlhWWRQQAmeMMrU5Qsw3JeiUNs5Y"
    },
    {
        nombre: "Formulario 3",
        id: "1WnpQ0H6qUcyvC6dyWEq5V57XN-vsnTWcijBsfrSdvqg"
    }
];

const Resultados = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sheetId, setSheetId] = useState(hojas[0].id);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
                const response = await fetch(url);
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
    }, [sheetId]);

    const handleSheetChange = (e) => {
        setSheetId(e.target.value);
    };

    const exportarCSV = () => {
        if (datos.length === 0) return;
        const csvContent = datos.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `resultados_${sheetId}.csv`);
        link.click();
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">📊 Resultados del Formulario</h2>

            <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4">
                <select
                    value={sheetId}
                    onChange={handleSheetChange}
                    className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {hojas.map((hoja, index) => (
                        <option key={index} value={hoja.id}>{hoja.nombre}</option>
                    ))}
                </select>
                <button
                    onClick={exportarCSV}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                    Descargar CSV
                </button>
            </div>

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