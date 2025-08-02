import { useState } from "react";

const empleados = [
  { id: "emp001", nombre: "Juan Pérez" },
  { id: "emp002", nombre: "María Gómez" },
  { id: "emp003", nombre: "Pedro Martínez" },
];

const edificios = ["Edificio 1", "Edificio 2"];

export default function FormularioFichaje() {
  const [empleadoId, setEmpleadoId] = useState("");
  const [edificio, setEdificio] = useState(edificios[0]);

  // Para enviar al Google Script
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!empleadoId) {
      alert("Por favor seleccioná un empleado");
      return;
    }

    const empleadoSeleccionado = empleados.find((e) => e.id === empleadoId);
    if (!empleadoSeleccionado) {
      alert("Empleado no válido");
      return;
    }

    // Construir payload para enviar
    const payload = new URLSearchParams({
      nombre: empleadoSeleccionado.nombre.split(" ")[0],
      apellido: empleadoSeleccionado.nombre.split(" ").slice(1).join(" "),
      edificio,
    });

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzNg8BgmzTTYWJKhVjftjWTHWsG_dWYIyGj8V_0orpxeJOTtevzK-ZSO2VFAGLuvFBg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: payload.toString(),
        }
      );
      alert("Asistencia enviada con éxito");
      setEmpleadoId("");
      setEdificio(edificios[0]);
    } catch (error) {
      alert("Error enviando asistencia");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">Fichar Asistencia</h2>

      <label className="block">
        Empleado:
        <select
          value={empleadoId}
          onChange={(e) => setEmpleadoId(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          required
        >
          <option value="">-- Seleccioná un empleado --</option>
          {empleados.map(({ id, nombre }) => (
            <option key={id} value={id}>
              {nombre}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        Edificio:
        <select
          value={edificio}
          onChange={(e) => setEdificio(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          required
        >
          {edificios.map((ed, i) => (
            <option key={i} value={ed}>
              {ed}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Enviar
      </button>
    </form>
  );
}
