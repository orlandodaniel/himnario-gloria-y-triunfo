import json
import os

def minificar_json(input_file, output_file):
    try:
        # Cargamos el JSON que generó tu script
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Guardamos sin indentación y con separadores compactos
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
            
        original_size = os.path.getsize(input_file) / 1024
        minified_size = os.path.getsize(output_file) / 1024
        
        print(f"--- MINIFICACIÓN ---")
        print(f"Original: {original_size:.2f} KB")
        print(f"Minificado: {minified_size:.2f} KB")
        print(f"Ahorro: {original_size - minified_size:.2f} KB")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    minificar_json('himnos.json', 'himnos.min.json')