# Panel de inventario — React + Node.js + Express

Aplicación full-stack de práctica con indicadores de inventario, tabla de productos, formulario para agregar artículos y opción para eliminarlos. El frontend consume una API REST.

## Requisitos
Node.js LTS instalado.

## Iniciar el backend
```bash
cd server
npm install
npm run dev
```
La API queda en `http://localhost:3002/api/items`.

## Iniciar el frontend
En otra terminal:
```bash
cd client
npm install
npm run dev
```
Abrí la URL local que indique Vite (normalmente `http://localhost:5173`).

## Qué practicar y explicar
- Componentes y estado con React (`useState`, `useEffect`, `useCallback`).
- Peticiones HTTP con `fetch` y operaciones GET, POST y DELETE.
- API REST con Express, validación de datos y códigos de estado.
- Estados de carga y mensajes de error.
- Indicadores derivados de los datos (stock bajo y productos sin stock).

## Limitación
El backend conserva los datos solo en memoria. Al reiniciarse, vuelve a los datos de ejemplo.
