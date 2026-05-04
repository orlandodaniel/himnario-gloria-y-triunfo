import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { himnosGloriaYTriunfo } from "../data/himnos";
import { useFavoritos } from "../hooks/useFavoritos";
// Importamos los iconos necesarios
import { Search, Heart, ListFilter } from "lucide-react";
import { useRecientes } from "../hooks/useRecientes";

import BottomNav from "../components/BottomNav";

const Home = () => {
  const [busqueda, setBusqueda] = useState("");
  // const [soloFavs, setSoloFavs] = useState(false);
  const { favoritos } = useFavoritos();
  const [filtro, setFiltro] = useState<"todos" | "favoritos" | "recientes">(
    "todos",
  );
  const { recientes, refrescarRecientes } = useRecientes();

  useEffect(() => {
    if (filtro === "recientes") {
      refrescarRecientes();
    }
  }, [filtro]);

  // Lógica de filtrado optimizada
  const filtrados = useMemo(() => {
    const term = busqueda.toLowerCase().trim();
    let base = [...himnosGloriaYTriunfo];

    // Aplicar el filtro de la sección seleccionada
    if (filtro === "favoritos") {
      base = base.filter((h) => favoritos.includes(h.id));
    } else if (filtro === "recientes") {
      // Mapeamos para mantener el orden de lectura (el más nuevo arriba)
      base = recientes
        .map((id) => himnosGloriaYTriunfo.find((h) => h.id === id))
        .filter((h): h is (typeof himnosGloriaYTriunfo)[0] => h !== undefined);
    }

    // Aplicar la búsqueda sobre la base filtrada
    if (!term) return base;

    return base.filter(
      (h) =>
        h.titulo.toLowerCase().includes(term) ||
        h.numero.toString().includes(term) ||
        h.letra.toLowerCase().includes(term) ||
        h.tags.some((t) => t.toLowerCase().includes(term)),
    );
  }, [busqueda, filtro, favoritos, recientes]);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <header className="bg-blue-700 pt-8 pb-6 px-6 rounded-b-[2.5rem] shadow-xl sticky top-0 z-30">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-white text-2xl font-bold">
            {filtro === "todos" && "Himnario de Gloria y Triunfo"}
            {filtro === "favoritos" && "Mis Favoritos"}
            {filtro === "recientes" && "Recientes"}
          </h1>
        </div>

        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Número, título o etiqueta..."
            className="w-full py-4 pl-12 pr-4 rounded-2xl border-none shadow-inner focus:ring-4 focus:ring-blue-400/50 outline-none transition-colors"
            style={{
              backgroundColor: "var(--bg-card)",
              color: "var(--text-main)",
            }}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </header>

      <main className="p-4 space-y-3 pb-24">
        {filtrados.length > 0 ? (
          filtrados.map((h) => (
            <Link
              key={h.id}
              to={`/himno/${h.id}`}
              className="flex items-center p-4 rounded-2xl shadow-sm border border-transparent hover:border-blue-200 active:opacity-70 transition-all group"
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-main)",
              }}
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-main)",
                  border: "1px solid rgba(37, 99, 235, 0.2)",
                }}
              >
                {h.numero}
              </div>

              <div className="flex-1 ml-4">
                <h2
                  className="font-bold text-lg"
                  style={{ color: "var(--text-main)" }}
                >
                  {h.titulo}
                </h2>
                <div className="flex flex-wrap gap-1 mt-1">
                  {h.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-md uppercase font-bold tracking-wider opacity-70"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {favoritos.includes(h.id) && (
                <div className="ml-2">
                  <Heart size={18} className="text-red-500 fill-red-500" />
                </div>
              )}
            </Link>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400">
            <ListFilter size={48} className="mx-auto mb-2 opacity-20" />
            <p>No se encontraron himnos</p>
          </div>
        )}
      </main>

      <BottomNav filtroActivo={filtro} setFiltro={setFiltro} />
    </div>
  );
};

export default Home;
