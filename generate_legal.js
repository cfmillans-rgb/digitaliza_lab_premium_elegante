const fs = require('fs');

// Data for replacement
const RUT = '78.517.255-8';
const RAZON = 'DIGITALIZA LAB SPA';
const DIR = 'Antonio Bellet 193 Of 1210, Providencia, Santiago, Chile';

// Template HTML derived from blog post structure
const templateHead = `<!doctype html>
<html lang="es-CL" class="scroll-smooth">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{TITLE}} | Digitaliza Lab</title>
  <meta name="description" content="{{DESC}}">
  <meta name="robots" content="noindex, follow">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/blog-styles.min.css">
  <style>
    html, body { background: #000; color: #e5e7eb; font-family: 'DM Sans', system-ui, sans-serif; }
    ::selection { background: rgba(224,122,58,0.35); color: #fff; }
    
    .nav-scrolled { background: rgba(10,14,26,0.78); backdrop-filter: blur(24px) saturate(160%); border-bottom: 1px solid rgba(255,255,255,0.07); box-shadow: 0 8px 32px -12px rgba(0,0,0,0.4); }
    
    .legal-content { font-family: 'DM Sans', sans-serif; font-size: 1.05rem; line-height: 1.8; color: #9ca3af; }
    .legal-content p { margin-bottom: 1.2rem; }
    .legal-content strong { color: #e5e7eb; font-weight: 600; }
    .legal-content h2 { font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 400; color: #e8eaf0; margin: 3rem 0 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem; }
    .legal-content h3 { font-family: 'Fraunces', serif; font-size: 1.2rem; font-weight: 500; color: #d1d5db; margin: 2rem 0 0.8rem; }
    .legal-content ul, .legal-content ol { margin-bottom: 1.5rem; padding-left: 0; list-style: none; }
    .legal-content ul li, .legal-content ol li { padding: 0.35rem 0 0.35rem 1.5rem; position: relative; }
    .legal-content ul li::before { content: '→'; position: absolute; left: 0; color: #e07a3a; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; }
    .legal-content ol { counter-reset: legal-counter; }
    .legal-content ol li::before { counter-increment: legal-counter; content: counter(legal-counter) "."; position: absolute; left: 0; color: #e07a3a; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; }
    .legal-content a { color: #ff8a42; text-decoration: none; transition: color 0.2s; }
    .legal-content a:hover { color: #e07a3a; text-decoration: underline; }
    
    /* Tables styling */
    .legal-content table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; background: rgba(255,255,255,0.02); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
    .legal-content th, .legal-content td { padding: 1rem 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: left; vertical-align: top; }
    .legal-content th { width: 30%; color: #d1d5db; font-weight: 500; background: rgba(255,255,255,0.03); }
    .legal-content td { color: #9ca3af; }
    .legal-content tr:last-child th, .legal-content tr:last-child td { border-bottom: none; }
    
    /* Callouts */
    .callout { background: rgba(224,122,58,0.05); border-left: 3px solid #ff8a42; padding: 1.2rem 1.5rem; border-radius: 0 12px 12px 0; margin-bottom: 1.5rem; }
    .callout p:last-child { margin-bottom: 0; }
    .callout-title { display: block; font-family: 'Fraunces', serif; font-size: 1.1rem; color: #ff8a42; margin-bottom: 0.5rem; }
    
    .btn-primary { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.7rem 1.2rem; background: linear-gradient(135deg, #e07a3a, #ff8a42); color: #0a0e1a; font-weight: 600; font-size: 0.85rem; border-radius: 999px; text-decoration: none; transition: transform 0.3s, box-shadow 0.3s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px -8px rgba(224,122,58,0.5); }
  </style>
</head>
<body>
  <!-- NAV -->
  <nav id="mainNav" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <div style="max-width: 80rem; margin: 0 auto; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between;">
      <a href="index.html" style="display: flex; align-items: center; gap: 0.6rem;" aria-label="Inicio Digitaliza Lab">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="30" height="30" rx="8" stroke="rgba(255,138,66,0.7)" stroke-width="1.5" fill="rgba(255,138,66,0.08)"/><text x="16" y="21.5" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="14" fill="#ff8a42" letter-spacing="-0.5">DL</text><circle cx="26" cy="7" r="2.5" fill="#ff8a42" opacity="0.9"/></svg>
        <span style="font-family: 'Fraunces', serif; font-size: 1.1rem; color: #fff;">Digitaliza<span style="color: #ff8a42; font-style: italic; font-weight: 500;"> Lab</span></span>
      </a>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <a href="index.html" style="font-size: 0.85rem; color: #ff8a42; font-weight: 500;">← Volver al inicio</a>
        <a href="https://wa.me/56982867164" target="_blank" rel="noopener noreferrer" class="btn-primary">Contacto</a>
      </div>
    </div>
  </nav>

  <main style="max-width: 48rem; margin: 0 auto; padding: 8rem 1.5rem 4rem;">
    <!-- Breadcrumb -->
    <nav aria-label="Breadcrumb" style="margin-bottom: 2rem;">
      <ol style="display: flex; gap: 0.5rem; list-style: none; padding: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: #71717a;">
        <li><a href="index.html" style="color: #71717a; transition: color 0.2s;">Inicio</a></li>
        <li>→</li>
        <li style="color: #ff8a42;">{{BREADCRUMB}}</li>
      </ol>
    </nav>

    <h1 style="font-family: 'Fraunces', serif; font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: 300; line-height: 1.1; letter-spacing: -0.025em; color: #fff; margin-bottom: 1rem;">{{H1}}</h1>
    <p style="font-size: 1.15rem; color: #9ca3af; margin-bottom: 0.5rem;">{{BAJADA}}</p>
    <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #71717a; margin-bottom: 3rem; text-transform: uppercase; letter-spacing: 0.05em;">{{VERSION}}</p>

    <article class="legal-content">
      {{CONTENT}}
    </article>
  </main>

  <!-- FOOTER -->
  <footer style="border-top: 1px solid rgba(255,255,255,0.05); padding: 3rem 1.5rem; text-align: center;">
    <div style="max-width: 48rem; margin: 0 auto;">
      <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2rem; font-size: 0.9rem;">
        <a href="terminos.html" style="color: #9ca3af; text-decoration: none;">Términos y condiciones</a>
        <a href="privacidad.html" style="color: #9ca3af; text-decoration: none;">Política de privacidad</a>
        <a href="entrega-y-reembolso.html" style="color: #9ca3af; text-decoration: none;">Entrega y reembolso</a>
        <a href="datos-empresa.html" style="color: #9ca3af; text-decoration: none;">Datos de la empresa</a>
      </div>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #52525b; letter-spacing: 0.1em; margin-bottom: 0.5rem;">© <script>document.write(new Date().getFullYear())</script> DIGITALIZA LAB SPA · RUT ${RUT}</p>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #52525b; letter-spacing: 0.05em;">${DIR}</p>
    </div>
  </footer>

  <script>
    const nav = document.getElementById('mainNav');
    if (nav) window.addEventListener('scroll', () => nav.classList.toggle('nav-scrolled', window.scrollY > 40), {passive:true});
  </script>
</body>
</html>`;

// ─────────────────────────────────────────────────────────────────────────────
// 1. PRIVACIDAD
// ─────────────────────────────────────────────────────────────────────────────
let privContent = `
  <div class="callout">
    <p>Esta política se ajusta a la <strong>Ley N° 19.628</strong> sobre protección de la vida privada y a la <strong>Ley N° 21.719</strong> sobre protección de datos personales, que rige plenamente desde el <strong>1 de diciembre de 2026</strong>.</p>
  </div>

  <h2>1. Quién es responsable de tus datos</h2>
  <table>
    <tr><th>Responsable</th><td>${RAZON}</td></tr>
    <tr><th>RUT</th><td>${RUT}</td></tr>
    <tr><th>Domicilio</th><td>${DIR}</td></tr>
    <tr><th>Contacto de privacidad</th><td><a href="mailto:privacidad@digitalizalab.cl">privacidad@digitalizalab.cl</a></td></tr>
  </table>
  <p>Cualquier consulta o solicitud sobre tus datos personales puedes dirigirla a ese correo. Es el canal oficial y lo revisamos.</p>

  <h2>2. Qué datos recolectamos y de dónde</h2>

  <h3>a) Cuando nos escribes o completas el formulario de contacto</h3>
  <ul>
    <li>Nombre</li>
    <li>Correo electrónico</li>
    <li>Teléfono o WhatsApp</li>
    <li>Rubro o necesidad y el mensaje que nos envías</li>
  </ul>

  <h3>b) Cuando contratas y completas el formulario de onboarding</h3>
  <ul>
    <li>Nombre y cargo de la persona responsable del proyecto</li>
    <li>Datos de contacto del negocio: correo, teléfono, dirección, horarios, redes sociales</li>
    <li>Información comercial del negocio: servicios, precios, diferenciadores, testimonios</li>
    <li>Archivos que nos entregas: logo, fotografías, textos, catálogos</li>
  </ul>

  <h3>c) Cuando pagas</h3>
  <ul>
    <li>Datos de facturación: razón social o nombre, RUT, giro y dirección</li>
    <li>Comprobante de pago o identificador de la transacción</li>
  </ul>
  <p><strong>No recibimos ni almacenamos datos de tarjetas de crédito o débito.</strong> Esos datos los procesa directamente la pasarela de pago, que es quien los custodia bajo sus propios estándares de seguridad.</p>

  <h3>d) Cuando navegas este sitio</h3>
  <p>Registros técnicos que genera automáticamente el servidor: dirección IP, tipo de navegador, páginas visitadas y fecha y hora de acceso. Se usan para seguridad y para detectar fallas.</p>
  <p>Además, <strong>si lo autorizas</strong> mediante nuestro banner de cookies, recogemos datos de navegación a través de Google Analytics y del Pixel de Meta: páginas que visitas, tiempo de permanencia, origen desde el que llegaste, tipo de dispositivo e interacciones con el sitio. El detalle está en el punto 7.</p>
  <p>Si no lo autorizas, esas herramientas <strong>no se cargan</strong> y no recogen nada.</p>

  <h2>3. Para qué usamos tus datos y con qué fundamento</h2>
  <table>
    <tr>
      <th>Responder consultas</th>
      <td>Contactarte, cotizar y resolver tus dudas.<br><em>Base: tu consentimiento al enviarnos el mensaje.</em></td>
    </tr>
    <tr>
      <th>Ejecutar el servicio</th>
      <td>Diseñar, desarrollar y publicar tu landing page, y configurar dominio, hosting, SSL y correo.<br><em>Base: ejecución del contrato que nos vincula.</em></td>
    </tr>
    <tr>
      <th>Cumplir obligaciones legales</th>
      <td>Emitir boletas y facturas electrónicas, llevar contabilidad y responder requerimientos de autoridades.<br><em>Base: obligación legal.</em></td>
    </tr>
    <tr>
      <th>Soporte y renovaciones</th>
      <td>Avisarte cuando venza tu dominio, hosting o correo, y atender el soporte posterior a la entrega.<br><em>Base: ejecución del contrato.</em></td>
    </tr>
    <tr>
      <th>Portafolio</th>
      <td>Mostrar el trabajo realizado como ejemplo en nuestro sitio o redes.<br><em>Base: interés legítimo. Puedes oponerte en cualquier momento y lo retiramos.</em></td>
    </tr>
    <tr>
      <th>Comunicaciones comerciales</th>
      <td>Enviarte novedades o promociones.<br><em>Base: tu consentimiento previo, específico y revocable. Nunca te agregamos sin que lo autorices, y cada mensaje incluye cómo darte de baja.</em></td>
    </tr>
    <tr>
      <th>Medir las visitas</th>
      <td>Entender cuántas personas entran al sitio, qué secciones leen y desde dónde llegan, para mejorarlo.<br><em>Base: tu consentimiento, otorgado en el banner de cookies. Si no lo das, la herramienta no se carga.</em></td>
    </tr>
    <tr>
      <th>Publicidad</th>
      <td>Medir el rendimiento de nuestros anuncios y mostrarte publicidad más relevante en las plataformas de Meta.<br><em>Base: tu consentimiento, otorgado en el banner de cookies. Si no lo das, la herramienta no se carga.</em></td>
    </tr>
  </table>
  <p><strong>No vendemos tus datos, no los cedemos a terceros con fines publicitarios y no tomamos decisiones automatizadas sobre ti.</strong></p>

  <h2>4. Cuánto tiempo los guardamos</h2>
  <ul>
    <li><strong>Consultas que no derivan en contratación:</strong> hasta 12 meses desde el último contacto.</li>
    <li><strong>Datos de clientes y material del proyecto:</strong> mientras dure la relación y hasta 12 meses después del término del último servicio activo, para poder darte soporte y entregarte tus accesos.</li>
    <li><strong>Documentos tributarios y contables:</strong> 6 años, según exige la normativa tributaria chilena.</li>
    <li><strong>Registros técnicos del servidor:</strong> el período de retención del proveedor de hosting.</li>
  </ul>
  <p>Cumplidos esos plazos, eliminamos o anonimizamos la información.</p>

  <h2>5. Con quién compartimos datos</h2>
  <p>Trabajamos con proveedores que actúan como encargados del tratamiento y solo pueden usar los datos para prestarnos su servicio:</p>
  <ul>
    <li><strong>Proveedor de hosting y dominio:</strong> alojamiento del sitio y del correo.</li>
    <li><strong>Google (Workspace, Forms y Drive):</strong> correo corporativo, formulario de onboarding y almacenamiento de los archivos del proyecto.</li>
    <li><strong>Pasarela de pago:</strong> procesamiento de los pagos con tarjeta.</li>
    <li><strong>WhatsApp Business (Meta):</strong> conversaciones de atención y venta.</li>
    <li><strong>Servicios de contabilidad y facturación electrónica:</strong> emisión de boletas y facturas.</li>
    <li><strong>Google Analytics (Google):</strong> medición de visitas al sitio. Solo si lo autorizas.</li>
    <li><strong>Pixel de Meta (Meta Platforms):</strong> medición de anuncios y publicidad personalizada. Solo si lo autorizas.</li>
  </ul>
  <p>En el caso de Google Analytics y del Pixel de Meta, esos proveedores tratan los datos también para sus propios fines, conforme a sus respectivas políticas de privacidad. Por eso te pedimos tu consentimiento antes de activarlos.</p>
  <p>También podemos entregar información cuando lo exija una autoridad competente o una obligación legal.</p>

  <h3>Transferencias fuera de Chile</h3>
  <p>Algunos de estos proveedores procesan información en servidores ubicados fuera de Chile, principalmente en Estados Unidos. Al contratarlos exigimos que ofrezcan garantías de seguridad y confidencialidad equivalentes a las que exige la legislación chilena, mediante sus cláusulas contractuales de tratamiento de datos.</p>

  <h2>6. Tus derechos</h2>
  <p>Como titular de los datos, la ley te reconoce los siguientes derechos, que puedes ejercer gratuitamente:</p>
  <ul>
    <li><strong>Acceso:</strong> saber qué datos tuyos tenemos, de dónde salieron y para qué los usamos.</li>
    <li><strong>Rectificación:</strong> corregir datos inexactos, desactualizados o incompletos.</li>
    <li><strong>Supresión o cancelación:</strong> pedir que eliminemos tus datos cuando ya no sean necesarios, cuando retires tu consentimiento o cuando el tratamiento carezca de fundamento.</li>
    <li><strong>Oposición:</strong> oponerte a un tratamiento determinado, incluido el uso de tu proyecto en nuestro portafolio.</li>
    <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y de uso común, o pedir que se los entreguemos directamente a otro responsable.</li>
    <li><strong>Bloqueo:</strong> pedir la suspensión temporal de cualquier operación de tratamiento.</li>
    <li><strong>Revocar tu consentimiento</strong> en cualquier momento, sin que eso afecte la licitud del tratamiento previo.</li>
  </ul>

  <h3>Cómo ejercerlos</h3>
  <p>Escríbenos a <a href="mailto:privacidad@digitalizalab.cl">privacidad@digitalizalab.cl</a> indicando qué derecho quieres ejercer y adjuntando una copia de tu cédula de identidad por ambos lados, para verificar que eres quien dices ser.</p>
  <p>Te responderemos dentro de los plazos que establece la ley y, en todo caso, en un <strong>máximo de 30 días corridos</strong> desde tu solicitud.</p>
  <p>Si no estás conforme con nuestra respuesta, o si no te respondemos, puedes reclamar ante la <strong>Agencia de Protección de Datos Personales</strong>, el organismo fiscalizador creado por la Ley N° 21.719.</p>

  <h2>7. Cookies y tecnologías de medición</h2>
  <p>Una cookie es un archivo pequeño que el sitio guarda en tu navegador. Las usamos en tres categorías, y <strong>solo la primera se activa sin preguntarte</strong>.</p>

  <table>
    <tr>
      <th>Necesarias<br><em style="font-weight:400; color:#71717a">Siempre activas</em></th>
      <td>Permiten que las páginas carguen y funcionen, y recuerdan la decisión que tomaste en el banner de cookies. Sin ellas el sitio no opera correctamente, por lo que no requieren consentimiento.<br>
      <em style="color:#71717a; font-size:0.9rem;">Duración: la de tu sesión, salvo la que guarda tu decisión sobre cookies, que se conserva hasta que la cambies o borres los datos de tu navegador.</em></td>
    </tr>
    <tr>
      <th>Analítica<br><em style="font-weight:400; color:#71717a">Requiere tu permiso</em></th>
      <td><strong>Google Analytics 4</strong>, de Google. Nos indica cuántas personas visitan el sitio, qué secciones leen, cuánto tiempo permanecen y desde dónde llegaron. Lo usamos para mejorar las páginas. La dirección IP se trata de forma anonimizada.<br>
      <em style="color:#71717a; font-size:0.9rem;">Duración: hasta 14 meses. Proveedor: Google. Más información en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</em></td>
    </tr>
    <tr>
      <th>Publicidad<br><em style="font-weight:400; color:#71717a">Requiere tu permiso</em></th>
      <td><strong>Pixel de Meta</strong>, de Meta Platforms. Nos permite medir el rendimiento de nuestros anuncios en Facebook e Instagram y mostrar publicidad más relevante a quienes ya visitaron el sitio.<br>
      <em style="color:#71717a; font-size:0.9rem;">Duración: hasta 90 días. Proveedor: Meta Platforms. Más información en <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener">facebook.com/privacy/policy</a>.</em></td>
    </tr>
  </table>

  <div class="callout">
    <span class="callout-title">Importante sobre tu consentimiento</span>
    <p>Hasta que no nos autorices, Google Analytics y el Pixel de Meta no se cargan. No es que se carguen y no registren: directamente no se ejecutan en tu navegador. Si rechazas, no se activan y nada se envía a esos proveedores.</p>
  </div>

  <h3>Transferencia a terceros países</h3>
  <p>Tanto Google como Meta procesan esta información en servidores ubicados fuera de Chile, principalmente en Estados Unidos, bajo las cláusulas contractuales de tratamiento de datos que cada uno publica. Al aceptar estas categorías estás autorizando esa transferencia.</p>

  <h2>8. Seguridad</h2>
  <p>Aplicamos medidas razonables para proteger tu información: conexión cifrada mediante certificado SSL, acceso restringido a las cuentas de trabajo, autenticación en dos pasos en los servicios que lo permiten y proveedores que cumplen estándares de seguridad reconocidos.</p>
  <p>Ningún sistema es infalible. Si ocurriera una vulneración que afecte tus datos personales, te lo informaremos y lo notificaremos a la autoridad en los términos y plazos que exige la ley.</p>

  <h2>9. Menores de edad</h2>
  <p>Nuestros servicios están dirigidos a personas mayores de 18 años y a empresas. No recolectamos intencionadamente datos de menores de edad. Si detectamos que recibimos datos de un menor sin la autorización correspondiente, los eliminaremos.</p>

  <h2>10. Datos que tratamos por cuenta de nuestros clientes</h2>
  <p>Cuando la landing page que desarrollamos incluye un formulario de contacto, los datos que ese formulario recoge pertenecen al negocio del cliente: <strong>el cliente es el responsable del tratamiento y Digitaliza Lab actúa únicamente como encargado</strong>, limitándose a lo necesario para desarrollar y mantener el sitio.</p>
  <p>Es responsabilidad de cada cliente publicar su propia política de privacidad y cumplir las obligaciones que la Ley N° 21.719 le impone frente a las personas que le entregan sus datos.</p>

  <h2>11. Cambios a esta política</h2>
  <p>Podemos actualizar esta política cuando cambien nuestros servicios, nuestros proveedores o la normativa aplicable. La versión vigente es siempre la publicada en esta página, identificada por su número de versión y fecha. Si el cambio es relevante, te lo informaremos por correo.</p>
`;

const filePriv = templateHead
  .replace(/{{TITLE}}/g, 'Política de Privacidad')
  .replace(/{{DESC}}/g, 'Cómo recolectamos, usamos y protegemos los datos personales, y cómo ejercer tus derechos conforme a la Ley N° 21.719.')
  .replace(/{{BREADCRUMB}}/g, 'Privacidad')
  .replace(/{{H1}}/g, 'Política de Privacidad')
  .replace(/{{BAJADA}}/g, 'Qué datos personales tratamos, para qué, con quién los compartimos y cómo puedes controlarlos.')
  .replace(/{{VERSION}}/g, 'Versión 1.0 · Última actualización: 30 de septiembre de 2026')
  .replace(/{{CONTENT}}/g, privContent);

fs.writeFileSync('privacidad.html', filePriv);

// ─────────────────────────────────────────────────────────────────────────────
// 2. DATOS DE LA EMPRESA
// ─────────────────────────────────────────────────────────────────────────────
let datosContent = `
  <h2>Identificación legal</h2>
  <table>
    <tr><th>Razón social</th><td>${RAZON}</td></tr>
    <tr><th>Nombre de fantasía</th><td>Digitaliza Lab</td></tr>
    <tr><th>RUT</th><td>${RUT}</td></tr>
    <tr><th>Tipo de sociedad</th><td>Sociedad por Acciones (SpA), constituida bajo el Régimen Simplificado de la Ley N° 20.659</td></tr>
    <tr><th>Giro</th><td>Servicios de diseño de sistemas informáticos, publicidad, y otros</td></tr>
    <tr><th>Representante legal</th><td>Camila Francisca Millán Salinas</td></tr>
    <tr><th>Domicilio comercial</th><td>${DIR}</td></tr>
  </table>

  <h2>Contacto</h2>
  <table>
    <tr><th>Correo general</th><td><a href="mailto:contacto@digitalizalab.cl">contacto@digitalizalab.cl</a></td></tr>
    <tr><th>Correo de privacidad</th><td><a href="mailto:privacidad@digitalizalab.cl">privacidad@digitalizalab.cl</a></td></tr>
    <tr><th>WhatsApp</th><td><a href="https://wa.me/56982867164">+56 9 8286 7164</a></td></tr>
    <tr><th>Sitio web</th><td><a href="https://digitalizalab.cl">digitalizalab.cl</a></td></tr>
    <tr><th>Horario de atención</th><td>Lunes a viernes, 9:00 a 18:00 h</td></tr>
  </table>

  <h2>Qué hacemos</h2>
  <p>Diseñamos y desarrollamos landing pages profesionales orientadas a conversión para pequeños y medianos negocios en Chile. Cada proyecto se entrega publicado, funcionando y con dominio, hosting, certificado SSL y correo corporativo incluidos por un año.</p>

  <table>
    <tr><th>Landing page</th><td>$99.990 neto · entrega en 72 horas hábiles</td></tr>
    <tr><th>Pack de ajustes</th><td>$39.990 neto · pago único, hasta 10 ajustes</td></tr>
    <tr><th>Renovación anual</th><td>$49.990 neto al año</td></tr>
  </table>

  <p>Todos los valores son netos y no incluyen IVA. El <strong>alcance completo del servicio</strong> está en los <a href="terminos.html">Términos y Condiciones</a>.</p>

  <h2>Pagos y documentos tributarios</h2>
  <ul>
    <li>Medios de pago habilitados: <strong>transferencia bancaria</strong> a la cuenta de la empresa y <strong>pasarela de pago en línea</strong> con tarjetas de crédito y débito.</li>
    <li>Emitimos <strong>boleta electrónica</strong> a personas naturales y <strong>factura electrónica</strong> a empresas, por cada servicio contratado.</li>
    <li>No almacenamos datos de tarjetas. Los pagos con tarjeta los procesa directamente la pasarela de pago.</li>
    <li>Los datos de nuestra cuenta bancaria se entregan junto con la cotización. <strong>Nunca los publicamos en este sitio ni los enviamos por canales distintos a los oficiales</strong>.</li>
  </ul>

  <h2>Defensa del consumidor</h2>
  <p>Si eres consumidor, te amparan los derechos de la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores. Puedes presentar un reclamo ante el Servicio Nacional del Consumidor en <a href="https://www.sernac.cl" target="_blank" rel="noopener">sernac.cl</a>.</p>
  <p>Antes de eso, escríbenos: preferimos resolverlo directo y rápido.</p>
`;

const fileDatos = templateHead
  .replace(/{{TITLE}}/g, 'Datos de la Empresa')
  .replace(/{{DESC}}/g, 'Identificación legal de Digitaliza Lab SpA: razón social, RUT, giro, domicilio comercial y canales de contacto.')
  .replace(/{{BREADCRUMB}}/g, 'Datos Empresa')
  .replace(/{{H1}}/g, 'Datos de la Empresa')
  .replace(/{{BAJADA}}/g, 'Quiénes somos formalmente. Detrás de Digitaliza Lab hay una empresa constituida en Chile, con RUT, domicilio y documentos tributarios.')
  .replace(/{{VERSION}}/g, 'Última actualización: 30 de septiembre de 2026')
  .replace(/{{CONTENT}}/g, datosContent);

fs.writeFileSync('datos-empresa.html', fileDatos);

// ─────────────────────────────────────────────────────────────────────────────
// 3. ENTREGA Y REEMBOLSO
// ─────────────────────────────────────────────────────────────────────────────
let entregaContent = `
  <h2>1. Qué recibes</h2>
  <p>Al contratar el servicio recibes una landing page profesional publicada y funcionando, con:</p>
  <ul>
    <li>Diseño responsive, verificado en móvil y escritorio</li>
    <li>Tu canal de contacto configurado y probado: WhatsApp, formulario, correo o el que definas</li>
    <li>Dominio, hosting, certificado SSL y correo corporativo activos por 1 año</li>
    <li>SEO técnico básico aplicado</li>
    <li>Los accesos y credenciales de lo que quede a tu nombre</li>
  </ul>
  <p>El detalle completo del alcance está en los <a href="terminos.html">Términos y Condiciones</a>.</p>

  <h2>2. Plazo de entrega</h2>
  <p>El plazo es de <strong>72 horas hábiles</strong>, contadas de lunes a viernes, excluidos sábados, domingos y festivos.</p>

  <div class="callout">
    <span class="callout-title">El reloj no parte cuando pagas</span>
    <p>Parte cuando tenemos todo lo que necesitamos para trabajar. Concretamente, cuando se cumplen las dos cosas a la vez: <strong>(a)</strong> el pago está confirmado y <strong>(b)</strong> recibimos tu formulario de onboarding completo, con los textos, imágenes y datos necesarios.</p>
  </div>

  <p>Si falta material o la información está incompleta, te lo avisamos y el plazo queda en suspenso hasta que llegue lo que falta. No es una manera de estirar los tiempos: sin tu contenido no hay landing que construir.</p>

  <h2>3. Cómo se entrega</h2>
  <ol>
    <li>Te enviamos la primera versión publicada en tu dominio, o en una dirección de previsualización si el dominio aún está propagando.</li>
    <li>Tienes <strong>7 días hábiles</strong> para enviar tu ronda de correcciones, en un solo mensaje consolidado.</li>
    <li>Aplicamos las correcciones y publicamos la versión final.</li>
    <li>Te entregamos los accesos y credenciales que correspondan.</li>
  </ol>
  <p>Si no envías correcciones dentro de esos 7 días hábiles, el proyecto se entiende aprobado tal como fue entregado.</p>

  <h2>4. Correcciones incluidas</h2>
  <p>El servicio incluye <strong>una ronda de correcciones</strong>: ajustes de textos, reemplazo de imágenes, ajustes de color, corrección de datos de contacto y cambios visuales menores.</p>
  <p>No entran en esa ronda los cambios completos de estructura, los rediseños totales, los cambios de enfoque comercial ni las secciones nuevas no contempladas. Todo eso se puede hacer, pero se cotiza aparte.</p>
  <p>Para cambios posteriores existe el <strong>pack de ajustes de $39.990 neto</strong>: pago único, hasta 10 ajustes menores en una sola instancia.</p>

  <h2>5. Reembolsos</h2>
  <p>El servicio se paga por adelantado y no está sujeto al derecho a retracto de 10 días, por tratarse de un desarrollo a medida. Esa exclusión está explicada en el punto 7 de los <a href="terminos.html">Términos y Condiciones</a>.</p>
  <p>Eso no significa que el dinero no se devuelva nunca. Estos son los casos:</p>

  <table>
    <tr>
      <th>100% de devolución</th>
      <td>Si pides la anulación <strong>antes de que recibamos tu formulario de onboarding</strong>, es decir, antes de que empecemos a trabajar.</td>
    </tr>
    <tr>
      <th>50% de devolución</th>
      <td>Si pides la anulación <strong>después de que recibimos tu onboarding y antes de la primera entrega</strong>. En ese punto ya está hecho el trabajo de estrategia, estructura y redacción, pero todavía no recibiste el resultado.</td>
    </tr>
    <tr>
      <th>Sin devolución</th>
      <td><strong>Después de la primera entrega.</strong> A partir de ahí el servicio ya fue prestado, y lo que corresponde es tu ronda de correcciones.</td>
    </tr>
  </table>

  <div class="callout">
    <p><strong>Única deducción posible</strong> en los tramos de 100% y 50%: si el dominio ya fue registrado a tu nombre, se descuenta su costo, porque el registro no es reversible. El dominio queda tuyo y te entregamos sus accesos.</p>
  </div>

  <h3>También devolvemos el 100% cuando la falla es nuestra</h3>
  <ul>
    <li>Si <strong>no podemos ejecutar el proyecto</strong>: por falta de disponibilidad, por fuerza mayor o porque decidimos no desarrollarlo.</li>
    <li>Si la entrega se atrasa <strong>más de 5 días hábiles</strong> por encima del plazo comprometido, por causas atribuibles a Digitaliza Lab, y decides no continuar.</li>
  </ul>

  <h3>Cuándo no procede devolución</h3>
  <ul>
    <li>Cuando el proyecto se pausa porque no envías la información o no respondes dentro de los plazos indicados en los Términos y Condiciones.</li>
    <li>Cuando el motivo es un <strong>resultado comercial</strong>: cantidad de visitas, contactos, ventas o posición en buscadores. Eso depende de tu oferta, tu mercado y tu inversión en difusión, y no lo garantizamos.</li>
    <li>Cuando el motivo es un cambio de opinión sobre el enfoque del negocio después de haber aprobado la propuesta.</li>
  </ul>

  <h2>6. Cómo pedir un reembolso</h2>
  <ol>
    <li>Escribe a <a href="mailto:ventas@digitalizalab.cl">ventas@digitalizalab.cl</a> indicando tu nombre o razón social, la fecha del pago y el motivo.</li>
    <li>Te respondemos en un plazo máximo de <strong>3 días hábiles</strong> confirmando si corresponde y por qué monto.</li>
    <li>Si corresponde, devolvemos dentro de <strong>10 días hábiles</strong> por el mismo medio de pago que usaste, o por transferencia a la cuenta que nos indiques.</li>
    <li>Emitimos la nota de crédito correspondiente al documento tributario original.</li>
  </ol>

  <h2>7. Si tienes un problema</h2>
  <p>Escríbenos primero a <a href="mailto:contacto@digitalizalab.cl">contacto@digitalizalab.cl</a> o por WhatsApp. La gran mayoría de los problemas se resuelven conversando y rápido.</p>
  <p>Si eres consumidor, conservas íntegros los derechos que te otorga la Ley N° 19.496 y puedes reclamar ante el SERNAC en <a href="https://www.sernac.cl" target="_blank" rel="noopener">sernac.cl</a>. Nada de lo dicho en esta política limita esos derechos.</p>
`;

const fileEntrega = templateHead
  .replace(/{{TITLE}}/g, 'Entrega y Reembolso')
  .replace(/{{DESC}}/g, 'Qué recibes, en qué plazo, cómo funcionan las correcciones y en qué casos devolvemos el dinero.')
  .replace(/{{BREADCRUMB}}/g, 'Entrega y Reembolso')
  .replace(/{{H1}}/g, 'Entrega y Reembolso')
  .replace(/{{BAJADA}}/g, 'Qué recibes, en qué plazo, y en qué casos devolvemos el dinero. Sin letra chica.')
  .replace(/{{VERSION}}/g, 'Versión 3.0 · Última actualización: 1 de octubre de 2026')
  .replace(/{{CONTENT}}/g, entregaContent);

fs.writeFileSync('entrega-y-reembolso.html', fileEntrega);

// ─────────────────────────────────────────────────────────────────────────────
// 4. TERMINOS Y CONDICIONES (Puntos 1-4 reconstruidos + Puntos 5-18 del usuario)
// ─────────────────────────────────────────────────────────────────────────────
let terminosContent = `
  <h2>1. Identificación y Partes</h2>
  <p>Este documento establece los términos y condiciones de servicio entre <strong style="color:#fff;">${RAZON}</strong> (en adelante, "Digitaliza Lab", RUT ${RUT}) y cualquier persona natural o jurídica que contrate sus servicios (en adelante, "el Cliente").</p>
  <p>Al realizar el pago del servicio, el Cliente declara haber leído, comprendido y aceptado íntegramente las condiciones aquí establecidas.</p>

  <h2>2. Descripción del Servicio</h2>
  <p>Digitaliza Lab ofrece el servicio de diseño y desarrollo de landing pages (sitios web de una sola página) orientadas a la conversión, incluyendo el registro de dominio, provisión de hosting, certificado SSL y configuración de correo corporativo por el primer año.</p>
  <p>Cualquier requerimiento adicional no descrito en la propuesta comercial (tales como desarrollo de software a medida, e-commerce, integración de APIs complejas, o redacción extensa de múltiples páginas) queda excluido del servicio estándar y deberá ser cotizado por separado.</p>

  <h2>3. Obligaciones Previas y Onboarding</h2>
  <p>Una vez realizado el pago, el Cliente deberá completar un formulario de "Onboarding" donde proporcionará todos los textos, imágenes, logotipos y requerimientos específicos para la construcción de la landing page.</p>
  <p>El trabajo de diseño y desarrollo no comenzará hasta que dicho formulario sea recibido de manera completa y conforme por parte de Digitaliza Lab.</p>

  <h2>4. Propiedad Intelectual Inicial</h2>
  <p>El Cliente declara contar con los derechos, licencias o autorizaciones necesarias sobre todos los textos, imágenes, logotipos, marcas y demás materiales que entregue a Digitaliza Lab para su uso en la landing page, y exime a Digitaliza Lab de cualquier responsabilidad legal derivada de infracciones a derechos de terceros.</p>

  <h2>5. Pagos y Documentos Tributarios</h2>
  <ul>
    <li>Para reservar el proyecto e iniciar el trabajo se requiere el <strong>pago del 100% por adelantado</strong>.</li>
    <li><strong>Todos los precios publicados y cotizados son valores netos y no incluyen IVA.</strong></li>
    <li>Medios de pago habilitados: <strong>transferencia bancaria</strong> a la cuenta de Digitaliza Lab SpA y <strong>pasarela de pago en línea</strong> con tarjetas de crédito y débito.</li>
    <li>Los datos de transferencia se entregan junto con la cotización. <strong>Nunca se publican en el sitio ni se envían por canales distintos a los oficiales.</strong></li>
    <li>Digitaliza Lab emite <strong>boleta electrónica</strong> a personas naturales y <strong>factura electrónica</strong> a empresas. Para emitir factura, el cliente debe entregar razón social, RUT, giro y dirección al momento de pagar.</li>
    <li>Digitaliza Lab no almacena datos de tarjetas. Esos datos los procesa directamente la pasarela de pago.</li>
    <li>Las renovaciones a partir del segundo año, así como cualquier licencia o servicio de terceros que el cliente requiera, son de su cargo y se informan antes de incurrir en ellos.</li>
  </ul>

  <h2>6. Plazo de entrega</h2>
  <p>El plazo de entrega es de <strong>72 horas hábiles</strong>. Se consideran horas hábiles las de días lunes a viernes, excluidos sábados, domingos y festivos.</p>

  <div class="callout">
    <span class="callout-title">El reloj no parte cuando pagas</span>
    <p>Concretamente, parte cuando se cumplen ambas condiciones a la vez: <strong>(a)</strong> el pago está confirmado y <strong>(b)</strong> recibimos el formulario de onboarding completo, con los textos, archivos, imágenes y datos necesarios.</p>
  </div>

  <p>Si la información o el material entregados están incompletos, te lo avisamos y el plazo queda en suspenso hasta recibir correctamente todo lo requerido. No es una manera de estirar los tiempos: sin tu contenido no hay landing que construir.</p>

  <h2>7. Derecho a retracto</h2>

  <div class="callout">
    <span class="callout-title">Información importante antes de contratar</span>
    <p><strong>Este servicio no está sujeto al derecho a retracto de 10 días.</strong></p>
    <p>En conformidad con el artículo 3 bis letra b) de la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores, Digitaliza Lab SpA dispone <strong>expresamente</strong> que no procede el derecho a poner término unilateralmente al contrato dentro de los 10 días siguientes a su celebración.</p>
  </div>
  
  <p>El motivo es que cada landing page se desarrolla <strong>a medida</strong>, sobre la información, los textos, las imágenes y las definiciones comerciales que entrega cada cliente, por lo que el trabajo no puede reutilizarse ni ofrecerse a un tercero.</p>
  <p>Esta exclusión se informa antes de contratar y se entiende aceptada con el pago del servicio.</p>
  <p>Esto <strong>no</strong> te deja sin protección. Revisa nuestra <a href="entrega-y-reembolso.html">Política de Entrega y Reembolso</a>, que establece en qué casos sí devolvemos el dinero y en qué proporción.</p>

  <h2>8. Revisiones y correcciones</h2>
  <p>El servicio incluye <strong>una ronda de correcciones</strong> posterior a la primera entrega.</p>
  <p>Esta ronda contempla ajustes menores: corrección de textos, reemplazo de imágenes, ajustes de color, corrección de datos de contacto y cambios visuales menores.</p>
  <p>Las correcciones deben enviarse en <strong>un solo mensaje consolidado</strong>, por el medio previamente acordado, dentro de los <strong>7 días hábiles</strong> siguientes a la entrega.</p>

  <h3>No se consideran correcciones incluidas</h3>
  <ul>
    <li>Cambios completos de estructura</li>
    <li>Rediseños totales</li>
    <li>Cambios de enfoque comercial del proyecto</li>
    <li>Incorporación de nuevas secciones no contempladas</li>
    <li>Modificaciones derivadas de información mal entregada o enviada fuera de plazo</li>
  </ul>

  <p>Si el cliente no envía su ronda de correcciones dentro del plazo de 7 días hábiles, el proyecto se considera aprobado tal como fue entregado. Cualquier ajuste adicional fuera de la ronda incluida se cotiza por separado.</p>

  <h2>9. Mantención posterior</h2>
  <p>Las actualizaciones posteriores a la entrega no están incluidas en el servicio.</p>
  <p>Para cambios futuros, Digitaliza Lab ofrece un <strong>pack de ajustes de $39.990 neto</strong>, de pago único, que contempla hasta 10 ajustes menores solicitados en una sola instancia. No es una suscripción: se contrata cuando lo necesitas y se agota al usarlo.</p>

  <h2>10. Responsabilidades del cliente</h2>
  <p>El cliente es responsable de:</p>
  <ul>
    <li>Entregar información verídica, completa y actualizada.</li>
    <li>Proveer los textos, imágenes y materiales necesarios para el proyecto.</li>
    <li>Entregar accesos o datos técnicos cuando corresponda.</li>
    <li>Aprobar entregas dentro de tiempos razonables.</li>
  </ul>
  <p>El cliente declara contar con los derechos o autorizaciones necesarias sobre los textos, imágenes, logotipos, marcas y demás materiales que entregue para su uso en la landing page, y responde por cualquier reclamo de terceros derivado de su uso.</p>
  <p>Digitaliza Lab podrá rechazar o suspender un proyecto cuyo contenido sea ilícito, infrinja derechos de terceros o contravenga las políticas del proveedor de hosting.</p>

  <h2>11. Pausas por falta de información o respuesta</h2>
  <ul>
    <li>Si el cliente paga pero no envía el formulario de onboarding completo dentro de <strong>30 días corridos</strong>, el proyecto queda en pausa y su reactivación queda sujeta a la disponibilidad de agenda de Digitaliza Lab.</li>
    <li>Si durante el desarrollo o la revisión el cliente no responde solicitudes de información, validaciones o correcciones dentro de <strong>5 días hábiles</strong>, el proyecto también puede pausarse y reprogramarse.</li>
    <li>Si la pausa se extiende y afecta el alcance, los tiempos o los costos, Digitaliza Lab puede solicitar una recotización antes de retomarlo.</li>
  </ul>

  <h2>12. Entrega y cierre del proyecto</h2>
  <ul>
    <li>El proyecto se considera entregado una vez enviada la versión final al cliente o publicada la landing page en el dominio correspondiente.</li>
    <li>Aprobada la entrega final —de forma explícita o por vencimiento del plazo de 7 días hábiles de correcciones— cualquier ajuste posterior se considera fuera del alcance inicial y puede cotizarse por separado.</li>
  </ul>

  <h2>13. Dominio, hosting, SSL y renovaciones</h2>
  <p>El servicio incluye dominio, hosting, certificado SSL y correo corporativo por <strong>1 año</strong> desde la publicación del sitio o la activación del servicio.</p>
  <p>Transcurridos los 12 meses, el cliente debe pagar la <strong>renovación anual de $49.990 neto</strong> para mantener el sitio activo. La renovación se ejecuta dentro de 24 horas hábiles desde la confirmación del pago.</p>

  <div class="callout">
    <span class="callout-title">Importante sobre las renovaciones</span>
    <p>Digitaliza Lab informará con anticipación la fecha estimada de renovación, pero <strong>el pago dentro del plazo es responsabilidad del cliente</strong>.</p>
    <p>Si la renovación no se paga a tiempo, el sitio puede dejar de funcionar, el correo puede suspenderse y <strong>el dominio puede quedar liberado y ser registrado por un tercero</strong>. En ese escenario Digitaliza Lab no se hace responsable ni puede garantizar la recuperación del dominio.</p>
  </div>

  <h2>14. Propiedad del sitio y accesos</h2>
  <ul>
    <li>Pagado íntegramente el servicio, el cliente es titular del sitio desarrollado y de los activos contratados a su nombre, según corresponda.</li>
    <li>Si el cliente decide migrar su sitio o administrar sus servicios con otro proveedor, Digitaliza Lab le entregará las credenciales y accesos disponibles que correspondan al proyecto.</li>
    <li>Digitaliza Lab conserva la propiedad de su plantilla maestra, de sus componentes reutilizables y de su metodología de trabajo. Lo que se transfiere al cliente es la landing page desarrollada para él, no los componentes genéricos subyacentes.</li>
    <li>Digitaliza Lab puede incluir una firma discreta «Sitio desarrollado por Digitaliza Lab» en el pie de página, y mostrar el proyecto en su portafolio, salvo que el cliente solicite lo contrario por escrito.</li>
  </ul>

  <h2>15. Limitación de responsabilidad</h2>
  <p>Digitaliza Lab responde por la correcta ejecución del servicio contratado según el alcance descrito en estos términos y en la cotización aceptada.</p>
  <p>Digitaliza Lab <strong>no garantiza resultados comerciales específicos</strong> —cantidad de visitas, contactos, ventas o posiciones en buscadores— ya que dependen de factores fuera de su control, como la oferta del cliente, su mercado, su inversión publicitaria y el comportamiento de los buscadores y redes sociales.</p>
  <p>Digitaliza Lab no responde por interrupciones, caídas o fallas atribuibles a los proveedores de dominio, hosting, correo, pasarela de pago o servicios de terceros integrados en el sitio.</p>
  <p>En todo caso, la responsabilidad de Digitaliza Lab está limitada al valor efectivamente pagado por el cliente por el servicio contratado.</p>

  <h2>16. Protección de datos personales</h2>
  <p>El tratamiento de los datos personales del cliente y de los datos que el cliente entregue se rige por nuestra <a href="privacidad.html">Política de Privacidad</a>, conforme a la Ley N° 19.628 y a la Ley N° 21.719 sobre Protección de Datos Personales.</p>
  <p>Cuando la landing page desarrollada incorpore un formulario de contacto, <strong>el cliente será el responsable del tratamiento de los datos que recoja a través de él</strong> y Digitaliza Lab actuará únicamente como encargado. Le corresponde al cliente cumplir con las obligaciones que la normativa le impone frente a esos titulares.</p>

  <h2>17. Modificaciones a estos términos</h2>
  <p>Digitaliza Lab puede actualizar estos términos y sus precios. La versión aplicable a cada proyecto es la vigente al momento del pago.</p>
  <p>Los cambios posteriores no afectan proyectos ya contratados, salvo que sean más favorables para el cliente o que la ley obligue a aplicarlos.</p>

  <h2>18. Ley aplicable y resolución de conflictos</h2>
  <p>Estos términos se rigen por las leyes de la República de Chile.</p>
  <p>Ante cualquier discrepancia, te pedimos escribirnos primero a <a href="mailto:contacto@digitalizalab.cl">contacto@digitalizalab.cl</a>: la mayoría de los problemas se resuelven conversando.</p>
  <p>Si el cliente tiene la calidad de consumidor, conserva íntegros los derechos que le otorga la Ley N° 19.496 y puede presentar un reclamo ante el Servicio Nacional del Consumidor en <a href="https://www.sernac.cl" target="_blank" rel="noopener">sernac.cl</a>. Ninguna cláusula de este documento limita esos derechos.</p>
`;

const fileTerminos = templateHead
  .replace(/{{TITLE}}/g, 'Términos y Condiciones')
  .replace(/{{DESC}}/g, 'Términos y condiciones de servicio aplicables a la contratación de desarrollo de landing pages con Digitaliza Lab SpA.')
  .replace(/{{BREADCRUMB}}/g, 'Términos y Condiciones')
  .replace(/{{H1}}/g, 'Términos y Condiciones')
  .replace(/{{BAJADA}}/g, 'Condiciones del servicio de diseño y desarrollo web. Reglas claras para proteger a ambas partes.')
  .replace(/{{VERSION}}/g, 'Versión 2.0 · Última actualización: 3 de octubre de 2026')
  .replace(/{{CONTENT}}/g, terminosContent);

fs.writeFileSync('terminos.html', fileTerminos);

console.log('4 pages generated successfully.');
