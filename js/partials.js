/* ══════════════════════════════════════════
   CICCHITTI — PARTIALS
   Nav y footer como strings para incluir
   en cada página. Si usás un build tool
   (Astro, Eleventy, etc.) convertí esto
   en componentes reales.
══════════════════════════════════════════ */

/* ─────────────────────────────────────────
   NAV PRINCIPAL (home y páginas con hero)
   Uso: document.getElementById('nav-placeholder').innerHTML = NAV_MAIN;
───────────────────────────────────────── */
const NAV_MAIN = `
<nav class="nav" id="main-nav">
  <a href="/" class="nav__logo">
    Cicchitti
    <span>Bodega Familiar · Mendoza</span>
  </a>
  <ul class="nav__links">
    <li><a href="/vinos">Vinos</a></li>
    <li><a href="/espumantes">Espumantes</a></li>
    <li><a href="/bodega">Bodega</a></li>
    <li><a href="#">Viñedos</a></li>
  </ul>
  <div class="nav__actions">
    <a href="/contacto" class="btn btn--outline-light" style="font-size:10px;padding:9px 20px;">Contacto</a>
  </div>
</nav>`;


/* ─────────────────────────────────────────
   FOOTER (igual en todas las páginas)
───────────────────────────────────────── */
const FOOTER = `
<footer class="footer">
  <div class="footer__top">
    <div class="footer__brand">
      <span class="footer__logo">Cicchitti</span>
      <span class="footer__logo-sub">Bodega Familiar · Mendoza</span>
      <p>Vinos elaborados familiarmente para celebrar la vida, desde Rodeo de la Cruz.</p>
      <div class="footer__address">
        Matías Torrontegui 444<br>
        Rodeo de la Cruz, M5525<br>
        Mendoza, Argentina
      </div>
    </div>
    <div class="footer__col">
      <h4>Vinos</h4>
      <ul>
        <li><a href="/vino?slug=emblema-malbec">Emblema</a></li>
        <li><a href="/vino?slug=edicion-limitada-malbec">Edición Limitada</a></li>
        <li><a href="/vino?slug=gran-reserva-malbec">Gran Reserva</a></li>
        <li><a href="/vinos#blend">Blend</a></li>
        <li><a href="/vinos#coleccion">Colección</a></li>
        <li><a href="/vinos#primmo">Primmo</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h4>Bodega</h4>
      <ul>
        <li><a href="/bodega">Nuestra historia</a></li>
        <li><a href="#">Viñedos</a></li>
        <li><a href="/espumantes">Espumantes</a></li>
        <li><a href="/personalizado">Personalizado</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h4>Contacto</h4>
      <ul>
        <li><a href="/contacto">Escribinos</a></li>
        <li><a href="https://wa.me/5492614000000">WhatsApp</a></li>
        <li><a href="https://instagram.com/bodegacicchitti" target="_blank">Instagram</a></li>
        <li><a href="/postularme">Trabajá con nosotros</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <div class="footer__legal">
      © 2026 Bodega Cicchitti &middot; Beber con moderación &middot; Prohibida su venta a menores de 18 años
    </div>
    <div class="footer__social">
      <a href="https://instagram.com/bodegacicchitti" target="_blank">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="5"/>
          <circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>
        </svg>
        Instagram
      </a>
    </div>
  </div>
</footer>

<a href="https://wa.me/5492614000000" class="whatsapp-fab" target="_blank" aria-label="WhatsApp">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.655 1.432 5.17L2.09 21.95l4.9-1.315A9.968 9.968 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.354-1.282l-.312-.185-3.237.868.875-3.178-.202-.326A7.962 7.962 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
  </svg>
</a>`;
