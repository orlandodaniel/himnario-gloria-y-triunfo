export interface Himno {
  id: number;
  numero: number;
  titulo: string;
  letra: string; // \n para saltos de línea
  tags: string[]; // Ej: "Adoración", "Cena del Señor"
  favorito: boolean;
}