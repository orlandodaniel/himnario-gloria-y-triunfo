import { Heart, Clock, Palette, BookOpen, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BottomNavProps {
  filtroActivo: "todos" | "favoritos" | "recientes";
  setFiltro: (filtro: "todos" | "favoritos" | "recientes") => void;
}

const BottomNav = ({ filtroActivo, setFiltro }: BottomNavProps) => {
  const navigate = useNavigate();

  // Estilo dinámico para los botones inactivos según el tema
  const estiloInactivo = { color: 'var(--text-muted)' };
  const estiloActivo = { color: '#2563eb' }; 

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 border-t pb-safe flex justify-around items-center h-16 z-50 transition-colors duration-300"
      style={{ 
        backgroundColor: 'var(--bg-card)', 
        borderColor: 'rgba(0,0,0,0.1)'
      }}
    >
      {/* Botón: Todos los Himnos */}
      <button
        onClick={() => {
          navigate("/");
          setFiltro("todos");
        }}
        className="flex flex-col items-center w-full transition-colors"
        style={filtroActivo === "todos" ? estiloActivo : estiloInactivo}
      >
        <BookOpen size={20} />
        <span className="text-[10px] mt-1 font-medium">Todos</span>
      </button>

      {/* Botón Favoritos */}
      <button
        onClick={() => setFiltro("favoritos")}
        className="flex flex-col items-center w-full transition-colors"
        style={filtroActivo === "favoritos" ? estiloActivo : estiloInactivo}
      >
        <Heart
          size={20}
          fill={filtroActivo === "favoritos" ? "currentColor" : "none"}
        />
        <span className="text-[10px] mt-1 font-medium">Favoritos</span>
      </button>

      {/* Botón Recientes */}
      <button
        onClick={() => setFiltro("recientes")}
        className="flex flex-col items-center w-full transition-colors"
        style={filtroActivo === "recientes" ? estiloActivo : estiloInactivo}
      >
        <Clock size={20} />
        <span className="text-[10px] mt-1 font-medium">Recientes</span>
      </button>

      {/* Botón Temas (Navegación) */}
      <button
        onClick={() => navigate("/temas")}
        className="flex flex-col items-center w-full transition-colors"
        style={estiloInactivo}
      >
        <Palette size={20} />
        <span className="text-[10px] mt-1 font-medium">Temas</span>
      </button>

      {/* Botón Temas (Navegación) */}
      <button
        onClick={() => navigate("/acerca-de")}
        className="flex flex-col items-center w-full transition-colors"
        style={estiloInactivo}
      >
        <Info size={20} />
        <span className="text-[10px] mt-1 font-medium">Acerca De</span>
      </button>
    </nav>
  );
};

export default BottomNav;