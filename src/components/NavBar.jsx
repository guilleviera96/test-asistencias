import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 flex space-x-6">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          "text-white " + (isActive ? "underline font-bold" : "hover:underline")
        }
        end
      >
        Inicio
      </NavLink>
      <NavLink 
        to="/relevamiento" 
        className={({ isActive }) => 
          "text-white " + (isActive ? "underline font-bold" : "hover:underline")
        }
      >
        Relevamiento
      </NavLink>
    </nav>
  );
}
