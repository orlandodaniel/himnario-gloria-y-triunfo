import json
import re
from docx import Document

def extraer_himnos_con_separacion_estofas(docx_path, json_output):
    doc = Document(docx_path)
    himnos = []
    current_himno = None
    
    # Regex para títulos: soporta números con punto, espacios, e inicio con ¿ o ¡
    regex_titulo = re.compile(r'^\s*(\d{1,3})[.\s\-]+([¿¡A-ZÁÉÍÓÚÑ].+)')
    # Regex para detectar números de estrofa (ej: "1", "2", "10")
    regex_indicador_estrofa = re.compile(r'^\d{1,2}$')

    for paragraph in doc.paragraphs:
        linea = paragraph.text.strip()
        
        # Saltamos líneas vacías del Word para controlarlas nosotros manualmente
        if not linea:
            continue

        match_titulo = regex_titulo.match(linea)
        
        if match_titulo:
            # Antes de empezar uno nuevo, guardamos el anterior
            if current_himno:
                current_himno['letra'] = current_himno['letra'].strip()
                himnos.append(current_himno)
            
            num = int(match_titulo.group(1))
            titulo = match_titulo.group(2).strip()
            
            current_himno = {
                "id": num,
                "numero": num,
                "titulo": titulo,
                "letra": "",
                "tags": [],
                "favorito": False
            }
        elif current_himno:
            # Verificamos si la línea actual es el inicio de una sección (Estrofa o Coro)
            es_inicio_seccion = regex_indicador_estrofa.match(linea) or "CORO" in linea.upper()
            
            if current_himno['letra']:
                if es_inicio_seccion:
                    # AGREGA DOBLE SALTO: Uno para cerrar la estrofa anterior y otro para la nueva
                    current_himno['letra'] += "\n\n" + linea
                else:
                    # Salto simple para contenido dentro de la misma estrofa
                    current_himno['letra'] += "\n" + linea
            else:
                # Es la primera línea de letra del himno
                current_himno['letra'] = linea

    # Guardar el último procesado
    if current_himno:
        current_himno['letra'] = current_himno['letra'].strip()
        himnos.append(current_himno)

    # Ordenar por número de himno
    himnos.sort(key=lambda x: x['numero'])

    with open(json_output, 'w', encoding='utf-8') as f:
        json.dump(himnos, f, ensure_ascii=False, indent=2)

    # Verificación final de integridad
    total = len(himnos)
    encontrados = [h['numero'] for h in himnos]
    faltantes = [n for n in range(1, 330) if n not in encontrados]
    
    print(f"--- RESULTADO ---")
    print(f"Total: {total} himnos extraídos.")
    if faltantes:
        print(f"Ojo, no se encontraron los números: {faltantes}")
    else:
        print("¡Todo perfecto! Del 1 al 329 procesados correctamente.")

if __name__ == "__main__":
    extraer_himnos_con_separacion_estofas('Himnario.docx', 'himnos.json')