import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import DetalleHimno from './pages/DetalleHimno.tsx';

function App() {
  return (
    <Router>
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/himno/:id" element={<DetalleHimno />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;