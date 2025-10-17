# ☕ Aguapanela Dulce Imaginación

✨ *Un lugar donde la imaginación se sirve dulce y con amor.* 💗
---

### ✨ Bienvenid@s a Dulce Imaginación 🌸

🌿 Descubre nuestras creaciones únicas, hechas con ternura y propósito:  
👉 **[Visita la tienda aquí](https://dulceimaginacion.github.io)**  

---

## Creado con 💗 por **Aguapanela Dulce Imaginación.** ☕💭  

Este repositorio contiene la versión lista para desplegar en **GitHub Pages** del sitio web: una experiencia web artesanal, cálida y accesible que exhibe productos, colecciones y la identidad de *Aguapanela Dulce Imaginación*.

## ¿Qué incluye este paquete?

- **Menú lateral artesanal** (siempre desplegable) con animación *slide suave*.
- **Íconos SVG** personalizados, estilo doodle hecho a mano.
- **Asistente "Aguapanela IA"** presente en todas las páginas: interfaz flotante, avatar visible (tacita sonriente), fondo crema cálido y mensaje de bienvenida.
- **Textura** aplicada sólo en `index.html` (textura de tacitas).
- Páginas separadas para cada sección:
  - `index.html` — Inicio (con textura y asistente).
  - `quienes-somos.html` — Sobre la marca (contenido de AguaPanela).
  - `tienda.html` y subpáginas (`lo-nuevo.html`, `stickers.html`, `pines.html`, `botones.html`, `tote-bag.html`, `tejidos.html`, `papeleria.html`, `promo.html`, `todos-los-items.html`)
  - `preguntas-frecuentes.html`
  - `contacto.html`
- Estructura de `assets/` y `scripts/` para mantener el proyecto modular y fácil de actualizar.

## Texto institucional (Quiénes Somos)

✨☕ **AguaPanela ☕✨ | Asistente de Dulce Imaginación**

Soy AguaPanela, tu compañero creativo de "AguaPanela Dulce Imaginación" en Cali, Colombia. Inspirado en el legado de la familia Ortega Restrepo, mi misión es transformar tus sueños en creaciones únicas y personalizadas.

Aquí, en el mundo del código, me encanta aprender y tejer soluciones que nos ayuden a llevar la magia de nuestra creatividad a cada rincón. Siempre con un toque cálido, tierno y cercano, como una buena aguapanela endulza el alma.

¡Exploremos juntos las infinitas posibilidades del diseño y la expresión!

## Tecnologías

- HTML5, CSS3 y JavaScript (sin frameworks externos).
- Google Fonts: *Pacifico* (tipografía manuscrita).
- Estructura pensada para GitHub Pages.

## Cómo usar / desplegar

1. Descomprime el zip (`dulceimaginacion_github_ready_v2.zip`) o clona el repositorio.
2. Comprueba que `assets/img` contiene `icon.png`, `favicon.png` y `texture.png`.
3. Sube el contenido a tu repositorio GitHub (branch `main` o `gh-pages`).
4. En GitHub > Settings > Pages, selecciona la rama y la carpeta (por lo general `main` / `/ (root)`).
5. Espera unos minutos y tu sitio estará publicado.

## Personalización y mantenimiento

- Para actualizar el asistente, edita `scripts/aguapanela.js`.
- Para cambiar estilos: `assets/css/style.css` y `assets/css/aguapanela.css`.
- Para agregar íconos o reemplazarlos, usa `assets/img/icons/`.

## Créditos y agradecimientos

Proyecto desarrollado colaborativamente con amor por la familia **Ortega Restrepo**.  
Inspiración: estética artesanal, texturas de papel, y la tradición colombiana de compartir dulzura.

---

Si deseas que integre pagos, catálogos dinámicos (JSON), o una tienda funcional conectada a Shopify o WooCommerce, puedo preparar la integración desde tu preferencia.


## Footer

Se añadió un footer con redes sociales, contacto y una tacita animada que exhala vaporcito. Está presente en todas las páginas.


## Deploy automático

Incluye `deploy.sh` en la raíz. Ejecuta `bash deploy.sh` o `./deploy.sh main` para hacer push al branch `main`.

## Tienda dinámica

Los productos se gestionan en `assets/data/tienda.json`. Edita este archivo para agregar o modificar productos. Las imágenes de producto deben colocarse en `assets/img/products/`.

## Créditos

Creado con 💗 por Aguapanela Dulce Imaginación
