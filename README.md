# Lector bilingüe (inglés → español)

Lee libros en inglés; toca una palabra, selecciona una frase o pide el párrafo y ve la traducción.
App web instalable (PWA). **Sin cuentas, sin claves, sin pagos.**

## Archivos
index.html · mt-worker.js · sw.js · manifest.webmanifest · icon-192.png · icon-512.png

## Publicarla gratis (elige una)
**GitHub Pages**
1. Crea un repositorio público en github.com y sube estos archivos (Add file → Upload files).
2. Settings → Pages → Source: "Deploy from a branch" → Branch: main / (root) → Save.
3. En ~1 minuto queda en https://TU-USUARIO.github.io/NOMBRE-REPO/
Tus libros NO se suben: se guardan solo en tu navegador.

**Cloudflare Pages / Netlify (más fácil):** entra a Netlify Drop (app.netlify.com/drop) y arrastra la carpeta.

**Probar en tu computador:** en la carpeta ejecuta `python3 -m http.server 8000` y abre http://localhost:8000
(no funciona abriendo el .html con doble clic: los service workers y workers necesitan http/https).

## Traducir sin internet
Abre ⚙ Ajustes:
- **Traductor de Chrome** (solo Chrome/Edge de escritorio): botón "Activar", descarga el idioma una vez.
- **Modelo local** (cualquier navegador moderno): botón "Descargar" (~115 MB una sola vez).
- Modo "Solo sin conexión": nunca usa internet para traducir.

## Libros
Arrastra .epub / .txt (Project Gutenberg, Standard Ebooks) o pega texto. También .json bilingüe:
{"title":"...","chapters":[{"title":"Cap 1","paragraphs":[{"en":"...","es":"..."}]}]}
