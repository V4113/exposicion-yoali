# Presentaci\u00f3n interactiva de Yoali

Proyecto web para una exposici\u00f3n escolar sobre el sue\u00f1o de ser piloto aviador.

## Estructura

- `index.html`: documento principal de la presentaci\u00f3n.
- `css/`: estilos visuales, animaciones y reglas responsivas.
- `js/`: l\u00f3gica para cargar contenido, renderizar diapositivas y navegar.
- `data/content.json`: textos, im\u00e1genes, notas y preguntas de la presentaci\u00f3n.
- `assets/`: recursos locales futuros como im\u00e1genes, audio, video e iconos.
- `docs/`: documentaci\u00f3n del proyecto.

## Uso

Como el contenido se carga desde `data/content.json`, abre el proyecto con un servidor local.

```bash
python -m http.server 5500
```

Luego visita:

```text
http://localhost:5500
```

## Agregar una diapositiva

Edita `data/content.json` y agrega un nuevo objeto dentro de `slides`. El c\u00f3digo renderiza autom\u00e1ticamente t\u00edtulo, lista, imagen, notas, preguntas y fuentes si esos campos existen.

## Cambiar im\u00e1genes

Cambia el valor `image.src` en `data/content.json`. Si en el futuro se descargan im\u00e1genes locales, col\u00f3calas en `assets/images/aviation/` y usa una ruta como:

```json
"src": "assets/images/aviation/avion.jpg"
```
