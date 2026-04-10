# Bodega Cicchitti — Web Rediseño

Proyecto de rediseño del sitio web de Bodega Cicchitti.
Desarrollado con HTML, CSS y JS vanilla (sin dependencias).

---

## Estructura de archivos

```
cicchitti/
│
├── index.html              ← Home principal
│
├── pages/
│   ├── vino.html           ← Template de vino individual (Emblema Malbec)
│   ├── vinos.html          ← Catálogo completo (pendiente)
│   ├── espumantes.html     ← Soigné (pendiente)
│   ├── bodega.html         ← Historia de la bodega (pendiente)
│   ├── personalizado.html  ← Servicio personalizado (pendiente)
│   └── contacto.html       ← Formulario de contacto (pendiente)
│
├── css/
│   ├── global.css          ← Variables, reset, utilitarios compartidos
│   ├── nav-footer.css      ← Nav y footer (iguales en todas las páginas)
│   ├── home.css            ← Estilos exclusivos de la home
│   └── wine-detail.css     ← Estilos de la página de vino individual
│
├── js/
│   ├── global.js           ← Nav scroll + scroll reveal (carga en todas)
│   ├── hero.js             ← Crossfade de imágenes (solo home)
│   └── partials.js         ← Strings de nav/footer para reutilizar
│
└── assets/
    ├── img/                ← Imágenes locales (botellas, fotos, etc.)
    └── video/              ← Acá va el hero.mp4 cuando esté disponible
```

---

## Cómo correrlo localmente

Opción 1 — VS Code Live Server:
1. Abrí la carpeta `cicchitti/` en VS Code
2. Clic derecho en `index.html` → "Open with Live Server"

Opción 2 — Python:
```bash
cd cicchitti
python3 -m http.server 3000
# Abrí http://localhost:3000
```

Opción 3 — Node:
```bash
cd cicchitti
npx serve .
```

> ⚠️ No abras los HTML directamente como archivos (`file://`).
> Algunos navegadores bloquean las fuentes de Google Fonts con ese protocolo.
> Usá siempre un servidor local.

---

## Paleta de colores

| Variable        | Valor     | Uso                        |
|-----------------|-----------|----------------------------|
| `--cream`       | #F4ECD8   | Texto principal (fondos oscuros) |
| `--cream-deep`  | #E8DCC4   | Fondo secciones crema       |
| `--gold`        | #C8A96E   | Acento dorado, CTAs         |
| `--gold-dim`    | #9A7A4A   | Gold secundario             |
| `--wine`        | #4B0F1A   | Color bordo, titulares      |
| `--dark`        | #0E0A08   | Fondo principal oscuro      |
| `--charcoal`    | #1C1714   | Fondo secciones oscuras     |
| `--ink`         | #12100E   | Footer                      |

---

## Tipografías

- **Cormorant Garamond** (serif) — titulares, citas, nombres de vinos
- **Jost** (sans-serif) — navegación, etiquetas, body text

Cargadas desde Google Fonts. Para producción, hosteá localmente con `google-webfonts-helper`.

---

## Agregar el video del hero

Cuando tengas el archivo de video:

1. Copiarlo a `assets/video/hero.mp4`
2. En `index.html`, reemplazar el bloque:
   ```html
   <div class="hero__bg" id="heroBg">
     <div class="hero__bg-slide active"></div>
     ...
   </div>
   ```
   Por:
   ```html
   <video class="hero__video" autoplay muted loop playsinline>
     <source src="assets/video/hero.mp4" type="video/mp4">
   </video>
   ```
3. Agregar en `home.css`:
   ```css
   .hero__video {
     position: absolute; inset: 0;
     width: 100%; height: 100%;
     object-fit: cover; object-position: center;
     z-index: 0;
   }
   ```
4. Eliminar `<script src="js/hero.js">` del `index.html`
5. Eliminar el div `.hero__dots` del HTML

---

## Crear más páginas de vino

`pages/vino.html` es el template base. Para un nuevo vino:

1. Duplicá `pages/vino.html` → `pages/gran-reserva-malbec.html`
2. Editá:
   - `<title>` y `<meta name="description">`
   - `.wine-hero__range-tag` — línea del vino (ej. "Gran Reserva")
   - `.wine-hero__bottle-img` — src de la imagen de la botella
   - `.wine-hero__name` / `.wine-hero__varietal`
   - `.wine-hero__tagline` — cita del vino
   - `.wine-hero__meta-item` — varietal / viñedo / altitud
   - `.wine-hero__vintage-num` — año cosecha
   - `.wine-hero__bg-word` — varietal en background
   - Tarjetas de cata (vista / nariz / boca)
   - Chips de aromas
   - Valores de las barras sensoriales (`width:XX%`)
   - Sección viñedo (datos de origen)
   - Medallas (si aplica)
   - Cards de "otros vinos"
3. Actualizá los links en `index.html` y el footer

---

## Pendientes

- [ ] `pages/vinos.html` — catálogo completo con filtros por línea
- [ ] `pages/espumantes.html` — landing de Soigné
- [ ] `pages/bodega.html` — historia completa
- [ ] `pages/personalizado.html` — formulario de contacto para etiquetas
- [ ] `pages/contacto.html` — formulario general
- [ ] Menú mobile (hamburger)
- [ ] SEO básico (og:image, sitemap, robots.txt)
- [ ] Reemplazar imágenes con fotos profesionales propias
- [ ] Actualizar número de WhatsApp real en todos los archivos
- [ ] Verificar y actualizar puntajes de medallas

---

## Notas

- Las imágenes actuales se cargan desde `bodegacicchitti.com`.
  Para producción, descargalas y servilas localmente desde `assets/img/`.
- El número de WhatsApp está como placeholder (`+54 9 261 400 0000`).
  Actualizarlo en `index.html`, `pages/vino.html`, `css/global.css`.
- El método BEM (`bloque__elemento--modificador`) se usa en todo el CSS.
