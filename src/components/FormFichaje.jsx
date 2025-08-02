import { useState } from "react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwhnDZpP1lfEGGIa2PCSjXnI_zSCS1f1QAUhx1XMZXvQaDrzpEQm8RE2HNJAbhhBUpD/exec";

export default function FormFichaje() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edificio, setEdificio] = useState("Edificio 1");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = { nombre, apellido, edificio };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(datos).toString(),
      });

      setMensaje("✅ Asistencia enviada correctamente.");
      setNombre("");
      setApellido("");
      setEdificio("Edificio 1");
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al enviar la asistencia.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Fichar Asistencia
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={edificio}
          onChange={(e) => setEdificio(e.target.value)}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Edificio 1</option>
          <option>Edificio 2</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Enviar Asistencia
        </button>

        {mensaje && (
          <p className="mt-4 text-center text-green-600 font-medium">{mensaje}</p>
        )}
      </form>
    </div>
  );
}
