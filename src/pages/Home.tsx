import  { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { himnosGloriaYTriunfo } from "../data/himnos";
import { useFavoritos } from "../hooks/useFavoritos";
// Importamos los iconos necesarios
import { Search, Heart, ListFilter } from "lucide-react";

const Home = () => {
  const [busqueda, setBusqueda] = useState("");
  const [soloFavs, setSoloFavs] = useState(false);
  const { favoritos } = useFavoritos();

  // Lógica de filtrado optimizada
  const filtrados = useMemo(() => {
    const term = busqueda.toLowerCase().trim();

    let resultado = himnosGloriaYTriunfo.filter(
      (h) =>
        h.titulo.toLowerCase().includes(term) ||
        h.numero.toString().includes(term) ||
        h.letra.toLowerCase().includes(term) ||
        h.tags.some((t) => t.toLowerCase().includes(term)),
    );

    if (soloFavs) {
      resultado = resultado.filter((h) => favoritos.includes(h.id));
    }

    return resultado;
  }, [busqueda, soloFavs, favoritos]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header y Buscador */}
      <header className="bg-blue-700 pt-8 pb-6 px-6 rounded-b-[2.5rem] shadow-xl sticky top-0 z-30">
        {/* Título Principal */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-white text-2xl font-bold flex items-center gap-2">
            
            <span>Himnario de Gloria y Triunfo</span>
          </h1>

          {/* Botón de Favoritos (Ahora arriba para mejor acceso) */}
          <button
            onClick={() => setSoloFavs(!soloFavs)}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              soloFavs
                ? "bg-red-500 text-white shadow-lg ring-2 ring-red-300 scale-110"
                : "bg-blue-800 text-blue-200 hover:bg-blue-600"
            }`}
            title={soloFavs ? "Ver todos" : "Ver favoritos"}
          >
            <Heart size={20} fill={soloFavs ? "white" : "none"} />
          </button>
        </div>

        {/* Buscador */}
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Número, título o etiqueta..."
            className="w-full py-4 pl-12 pr-4 rounded-2xl border-none shadow-inner focus:ring-4 focus:ring-blue-400/50 outline-none text-gray-800 bg-white"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </header>

      {/* Lista de Himnos */}
      <main className="p-4 space-y-3 pb-24">
        {filtrados.length > 0 ? (
          filtrados.map((h) => (
            <Link
              key={h.id}
              to={`/himno/${h.id}`}
              className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 active:bg-gray-50 transition-all group"
            >
              {/* Círculo con el número */}
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 font-black text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {h.numero}
              </div>

              {/* Título y Tags */}
              <div className="flex-1 ml-4">
                <h2 className="text-slate-900 font-bold text-lg"> {h.titulo} </h2>
                <div className="flex flex-wrap gap-1 mt-1">
                  {h.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-md text-gray-500 uppercase font-bold tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Indicador de Favorito */}
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
    </div>
  );
};

export default Home;
