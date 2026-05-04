import { useState, useEffect } from 'react';
import { historyService } from '../services/historyService';

export const useRecientes = () => {
  const [recientes, setRecientes] = useState<number[]>([]);

  const cargarRecientes = async () => {
    const ids = await historyService.getRecents();
    setRecientes(ids);
  };

  useEffect(() => {
    cargarRecientes();
  }, []);

  return { recientes, refrescarRecientes: cargarRecientes };
};