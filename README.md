# Lector · aprende inglés leyendo (versión 4)

App web instalable (PWA), 100 % gratuita: sin cuentas, sin claves, sin servidores propios.
Todo se guarda en tu dispositivo.

## Archivos (súbelos TODOS a la raíz del repositorio)
index.html · sw.js · mt-worker.js · manifest.webmanifest · icon-192.png · icon-512.png
jszip.min.js · pdf.min.js · pdf.worker.min.js   ← librerías para EPUB y PDF (ya no dependen de internet)

## Actualizar en GitHub Pages
1. En tu repositorio: Add file → Upload files → arrastra estos archivos (reemplazan a los anteriores) → Commit changes.
2. Espera ~1 minuto y abre la app. Si aparece “Hay una versión nueva”, toca Actualizar.
Tus libros, palabras y progreso NO se pierden al actualizar.

## Novedades v4
- Diseño nuevo: inicio con racha, meta y “Continuar leyendo”; portadas; página de lectura tipo libro; barra inferior; hojas deslizantes en el celular; tema claro/sepia/oscuro.
- Botón Aa: tipografía (Literata, Georgia, Inter), tamaño, interlineado, ancho, colores de palabras y voz.
- Colores por nivel: azul punteado = nueva, amarillo = aprendiendo, sin color = conocida. ✓ marca una palabra como conocida; al final del capítulo puedes marcar todas las restantes.
- Palabras clave del capítulo (✦): las nuevas que más se repiten, con definición en inglés.
- Expresiones y phrasal verbs (give up, look forward to, turned it off, of course…): se detectan y se explican juntas.
- Lectura en voz alta (▶) con la frase resaltada, velocidad y voz; “Leer desde aquí” en la ventana de una palabra.
- Más robusta: aviso de actualización, funciona con internet lento, avisa si el dispositivo se queda sin espacio, divide capítulos muy largos, al borrar un libro limpia sus datos.

## Todo lo anterior sigue
Diccionario inglés-inglés, traducción (Chrome, modelo local sin internet, Google), repaso espaciado SM-2,
importar EPUB/PDF/TXT/JSON, búsqueda, marcadores, subrayados con notas, estadísticas y copia de seguridad (⚙ → Exportar).

Probar en tu computador: `python3 -m http.server 8000` en esta carpeta y abre http://localhost:8000
