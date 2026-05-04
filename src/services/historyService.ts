import { Preferences } from '@capacitor/preferences';

const STORAGE_KEY = 'recientes';

export const historyService = {
  // Guardar un himno en el historial
  addRecent: async (himnoId: number) => {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    let actuales: number[] = value ? JSON.parse(value) : [];

    // Lógica de Negocio: 
    // 1. Quitamos el ID si ya existía para que no se repita
    // 2. Lo ponemos al inicio (index 0)
    // 3. Limitamos a los últimos 10
    const nuevaLista = [
      himnoId, 
      ...actuales.filter(id => id !== himnoId)
    ].slice(0, 10);

    await Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(nuevaLista),
    });
  },

  // Obtener la lista de IDs recientes
  getRecents: async (): Promise<number[]> => {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    return value ? JSON.parse(value) : [];
  }
};