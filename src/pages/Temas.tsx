import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Moon, Coffee, Check } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

const Temas = () => {
  const navigate = useNavigate();
  const { tema, setTema } = useSettings();

  const opciones = [
    { id: "claro", nombre: "Claro", icon: Sun, colorClass: "bg-white text-slate-900 border-gray-200" },
    { id: "oscuro", nombre: "Oscuro", icon: Moon, colorClass: "bg-slate-900 text-white border-slate-700" },
    { id: "sepia", nombre: "Sepia", icon: Coffee, colorClass: "bg-[#f4ecd8] text-amber-900 border-[#e5dcc5]" },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <header className="flex items-center p-6 gap-4     border-gray-200 bg-[var(--bg-card)]">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-[var(--text-main)]"
          aria-label="Volver"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-[var(--text-main)]">Apariencia</h1>
      </header>

      <main className="p-6 space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
            Selecciona un tema
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            {opciones.map((opc) => (
              <button
                key={opc.id}
                onClick={() => setTema(opc.id)}
                className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all shadow-sm ${
                  tema === opc.id 
                    ? "border-blue-500 ring-2 ring-blue-500/20" 
                    : "border-transparent"
                } ${opc.colorClass}`}
              >
                <div className="flex items-center gap-4">
                  <opc.icon size={22} />
                  <span className="font-bold text-lg">{opc.nombre}</span>
                </div>
                {tema === opc.id && (
                  <div className="bg-blue-500 rounded-full p-1">
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Temas;