// Marca de versión de cada publicación: se agrega a los enlaces CSS para que
// el navegador descargue siempre los estilos nuevos (evita el caché viejo).
module.exports = () => ({ version: Date.now().toString(36) });
