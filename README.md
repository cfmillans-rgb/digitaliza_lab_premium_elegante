# digitalizalab.cl

Sitio web de Digitaliza Lab, generado con [Eleventy](https://www.11ty.dev/) y [Tailwind CSS](https://tailwindcss.com/).

## Editar

- **Textos y páginas:** archivos dentro de `src/`.
- **Precios:** `src/_data/precios.json` (valores netos; el total con IVA se calcula solo).
- **Datos de la empresa** (RUT, dirección, WhatsApp, correo): `src/_data/empresa.json`.

Las instrucciones completas, también para editores con IA, están en [AGENTS.md](AGENTS.md).

## Probar en tu computador

```bash
npm install
npm start      # vista previa en http://localhost:8080
```

## Publicar

Haz push a `main`. GitHub Actions compila el sitio y lo publica en GitHub Pages (pestaña **Actions** del repositorio para ver el avance).
