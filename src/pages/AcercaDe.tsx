import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Code2, Code, Info, Phone} from "lucide-react";

const AcercaDe = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-10 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="bg-blue-700 pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-xl mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 p-2 bg-white/20 rounded-full text-white active:scale-90 transition-transform"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-3xl font-bold">Información</h1>
        <p className="text-blue-100 opacity-80">Versión 1.0.0</p>
      </header>

      <main className="px-6 space-y-6">
        {/* Sección de la App */}
        <section className="p-6 rounded-3xl shadow-sm border border-transparent" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Info size={24} />
            <h2 className="text-xl font-bold">Sobre la App</h2>
          </div>
          <p className="leading-relaxed mb-4" style={{ color: 'var(--text-main)' }}>
            <strong>Himnario Gloria y Triunfo</strong> es una herramienta digital diseñada para facilitar el acceso a la música cristiana tradicional. 
            Permite búsquedas rápidas por número, título o contenido de la letra, además de gestionar favoritos e historial.
          </p>
          <div className="text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
            <p>• 329 Himnos incluidos</p>
            <p>• Soporte Offline completo</p>
            <p>• Personalización de lectura (Temas y Zoom)</p>
          </div>
        </section>

        {/* Sección del Desarrollador */}
        <section className="p-6 rounded-3xl shadow-sm border border-transparent" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Code size={24} />
            <h2 className="text-xl font-bold">Desarrollador</h2>
          </div>
          
          <div className="mb-4">
            <h3 className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>Orlando Daniel Belisario</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Ingeniero de Sistemas & Full-Stack Developer</p>
          </div>

          <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-main)' }}>
            Especializado en la creación de soluciones tecnológicas robustas y escalables, con pasión por el desarrollo web, movil y la optimización de sistemas.
          </p>

          <div className="grid grid-cols-1 gap-3">
            <a 
              href="https://github.com/orlandodaniel" 
              target="_blank" 
              className="flex items-center gap-3 p-3 rounded-2xl transition-colors"
              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-main)' }}
            >
              <Code2 size={20} className="text-blue-600" />
              <span>GitHub: orlandodaniel</span>
            </a>
            <a 
              href="mailto:dev.sario2026@gmail.com" 
              className="flex items-center gap-3 p-3 rounded-2xl transition-colors"
              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-main)' }}
            >
              <Mail size={20} className="text-blue-600" />
              <span>dev.sario2026@gmail.com</span>
            </a>
            <a 
              href="https://api.whatsapp.com/send?phone=584243190944" 
              className="flex items-center gap-3 p-3 rounded-2xl transition-colors"
              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-main)' }}
            >
              <Phone size={20} className="text-blue-600" />
              <span>Whatsapp: +584243190944</span>
            </a>
          </div>
        </section>

        <footer className="text-center py-4 opacity-40 text-xs" style={{ color: 'var(--text-main)' }}>
          Hecho con ❤️ para la comunidad cristiana.
        </footer>
      </main>
    </div>
  );
};

export default AcercaDe;