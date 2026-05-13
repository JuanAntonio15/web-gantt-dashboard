# web-gantt-dashboard

Carta Gantt interactiva — Fauna Propiedades · Fase 0.

Stack: Vite + React 18 + TypeScript + Tailwind CSS v4.

## Desarrollo local

```bash
npm install
npm run dev
```

En modo dev, cada cambio en la UI se guarda automáticamente en `public/data.json` (debounce 500 ms). Indicador visual en esquina inferior derecha.

## Actualizar el dashboard

1. Editar `public/data.json` directamente, o hacer cambios en la web con `npm run dev`.
2. `git add public/data.json && git commit -m "update gantt" && git push`
3. El workflow de GitHub Actions despliega automáticamente.

## Activar GitHub Pages

Settings → Pages → Source: **GitHub Actions**

## Build

```bash
npm run build   # genera dist/ con base path /web-gantt-dashboard/
```

## Producción

En la versión desplegada aparece el botón **Descargar JSON** para exportar el estado actual, reemplazar el archivo localmente y hacer push.
