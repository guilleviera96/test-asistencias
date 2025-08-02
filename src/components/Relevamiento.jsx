import { useEffect, useState } from "react";

export default function Relevamiento() {
  const [asistencias, setAsistencias] = useState([]);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAsistencias = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbwRqqrpfkI3HjfHY27m6yFE2i286trPFLnyzBuWcIId-dl01jgQEoYH4djL0mUCAhxV/exec?mes=${mes}&ano=${ano}`
      );

      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

      const data = await res.json();
      setAsistencias(data);
    } catch (err) {
      setError("No se pudo cargar la información.");
      setAsistencias([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAsistencias();
  }, [mes, ano]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Relevamiento de Asistencias</h1>

      <div className="flex space-x-4 mb-6">
        <select
          value={mes}
          onChange={(e) => setMes(Number(e.target.value))}
          className="p-2 border rounded"
          aria-label="Seleccionar mes"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("es-AR", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={ano}
          onChange={(e) => setAno(Number(e.target.value))}
          className="p-2 border rounded"
          aria-label="Seleccionar año"
        >
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Cargando...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && asistencias.length === 0 && !error && (
        <p>No se encontraron registros para este mes.</p>
      )}

      {!loading && asistencias.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Nombre</th>
              <th className="border border-gray-300 p-2">Apellido</th>
              <th className="border border-gray-300 p-2">Edificio</th>
              <th className="border border-gray-300 p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {asistencias.map((fila, i) => (
              <tr key={i}>
                <td className="border border-gray-300 p-2">{fila[0]}</td>
                <td className="border border-gray-300 p-2">{fila[1]}</td>
                <td className="border border-gray-300 p-2">{fila[2]}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(fila[3]).toLocaleDateString("es-AR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
