import { useParams, useNavigate } from "react-router-dom";
import { himnosGloriaYTriunfo } from "../data/himnos";
import { useFavoritos } from "../hooks/useFavoritos";
import { Heart, ArrowLeft, ZoomIn, ZoomOut } from "lucide-react";
import { useSettings } from "../hooks/useSettings";

const DetalleHimno = () => {
  const { id } = useParams();
  const { cargando } = useSettings();
  const navigate = useNavigate();
  const { favoritos, toggleFavorito } = useFavoritos();
  const { settings, aumentarFuente, disminuirFuente } = useSettings();

  const idNumerico = Number(id);
  const himno = himnosGloriaYTriunfo.find((h) => h.id === idNumerico);
  const esFavorito = favoritos.includes(idNumerico);

  if (!himno)
    return (
      <div className="p-10 text-center font-bold">Himno no encontrado</div>
    );

  if (cargando) return <div className="min-h-screen bg-white"></div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      {/* Barra de Navegación Superior */}
      <nav className="grid grid-cols-3 items-center p-4 border-b sticky top-0 bg-white/90 backdrop-blur-md z-30 pt-10">

        <div className="flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="p-2 active:bg-gray-100 rounded-full transition-colors"
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
          <div className="flex items-center gap-1 bg-gray-100 rounded-2xl p-1 shadow-inner">
            <button
              onClick={disminuirFuente}
              className="p-2 hover:bg-white rounded-xl active:scale-90 transition-all text-gray-600"
              title="Disminuir letra"
            >
              <ZoomOut size={20} />
            </button>
            <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
            <button
              onClick={aumentarFuente}
              className="p-2 hover:bg-white rounded-xl active:scale-90 transition-all text-gray-600"
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
          <h1 className="text-3xl font-serif font-bold leading-tight text-black">
            {himno.titulo}
          </h1>
        </header>

        <article
          className="font-serif leading-relaxed text-gray-800 whitespace-pre-line text-center mx-auto"
          style={{ fontSize: `${settings.fontSize}px` }} // Ya viene con el valor real
        >
          {himno.letra}
        </article>
      </main>

      {/* Botón de Favoritos Flotante - Abajo a la Derecha */}
      <button
        onClick={() => toggleFavorito(idNumerico)}
        className={`fixed bottom-8 right-6 p-5 rounded-full shadow-2xl z-40 active:scale-95 transition-all ${
          esFavorito
            ? "bg-red-500 text-white"
            : "bg-white text-gray-400 border border-gray-100"
        }`}
        aria-label={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        <Heart
          size={28}
          fill={esFavorito ? "currentColor" : "none"}
          className="transition-colors duration-100"
        />
      </button>
    </div>
  );
};

export default DetalleHimno;
