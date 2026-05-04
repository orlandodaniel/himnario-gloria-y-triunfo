import { useParams, useNavigate } from "react-router-dom";
import { himnosGloriaYTriunfo } from "../data/himnos";
import { useFavoritos } from "../hooks/useFavoritos";
import { Heart, ArrowLeft, ZoomIn, ZoomOut } from "lucide-react";
import { useSettings } from "../hooks/useSettings";
import { useEffect } from 'react';
import { historyService } from "../services/historyService";

const DetalleHimno = () => {
  const { id } = useParams();
  const { cargando } = useSettings();
  const navigate = useNavigate();
  const { favoritos, toggleFavorito } = useFavoritos();
  const { settings, aumentarFuente, disminuirFuente } = useSettings();

  const idNumerico = Number(id);
  const himno = himnosGloriaYTriunfo.find((h) => h.id === idNumerico);
  const esFavorito = favoritos.includes(idNumerico);

  useEffect(() => {
    historyService.addRecent(idNumerico).catch(console.error);
  }, [idNumerico]);

  if (!himno)
    return (
      <div className="p-10 text-center font-bold text-[var(--text-main)]" style={{ backgroundColor: 'var(--bg-primary)' }}>
        Himno no encontrado
      </div>
    );

  if (cargando) return <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}></div>;

  return (
    <div className="min-h-screen pb-20 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Barra de Navegación Superior */}
      <nav 
        className="grid grid-cols-3 items-center p-4 border-b sticky top-0 backdrop-blur-md z-30 pt-10"
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'rgba(0,0,0,0.1)',
          color: 'var(--text-main)' 
        }}
      >
        <div className="flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="p-2 active:opacity-60 rounded-full transition-colors"
            style={{ color: 'var(--text-main)' }}
            aria-label="Volver"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="flex justify-center text-center">
          <p className="text-blue-600 font-black uppercase tracking-widest text-base leading-none">
            Himno {himno.numero}
          </p>
        </div>

        <div className="flex justify-end">
          <div 
            className="flex items-center gap-1 rounded-2xl p-1 shadow-inner"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            <button
              onClick={disminuirFuente}
              className="p-2 hover:opacity-80 rounded-xl active:scale-90 transition-all"
              style={{ color: 'var(--text-main)' }}
              title="Disminuir letra"
            >
              <ZoomOut size={20} />
            </button>
            <div className="w-[1px] h-4 bg-gray-300 mx-0.5 opacity-30"></div>
            <button
              onClick={aumentarFuente}
              className="p-2 hover:opacity-80 rounded-xl active:scale-90 transition-all"
              style={{ color: 'var(--text-main)' }}
              title="Aumentar letra"
            >
              <ZoomIn size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido del Himno */}
      <main className="p-6 max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <h1 
            className="text-3xl font-serif font-bold leading-tight"
            style={{ color: 'var(--text-main)' }}
          >
            {himno.titulo}
          </h1>
        </header>

        <article
          className="font-serif leading-relaxed whitespace-pre-line text-center mx-auto transition-all"
          style={{ 
            fontSize: `${settings.fontSize}px`,
            color: 'var(--text-main)'
          }}
        >
          {himno.letra}
        </article>
      </main>

      {/* Botón de Favoritos Flotante */}
      <button
        onClick={() => toggleFavorito(idNumerico)}
        className={`fixed bottom-8 right-6 p-3 rounded-full shadow-2xl z-40 active:scale-95 transition-all ${
          esFavorito ? "bg-red-400 text-white" : ""
        }`}
        style={!esFavorito ? { 
          backgroundColor: 'var(--bg-card)', 
          color: 'var(--text-muted)',
          border: '1px solid rgba(0,0,0,0.1)' 
        } : {}}
        aria-label={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        <Heart
          size={25}
          fill={esFavorito ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
};

export default DetalleHimno;