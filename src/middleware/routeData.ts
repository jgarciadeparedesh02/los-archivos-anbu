// src/routeData.ts
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  const { url, locals } = context;
  const route = locals.starlightRoute;

  // Si no estamos en /desarrollo-interfaces/utX/, no toques el sidebar.
  const match = url.pathname.match(/^\/desarrollo-interfaces\/(ut\d+)\/?/i);
  if (!match) return;

  // Directorio que usas en autogenerate: 'desarrollo-interfaces/ut6', etc.
  const utDir = `desarrollo-interfaces/${match[1]}`;

  // Opcional: conserva el enlace principal del módulo
  const keepLink = (entry: any) =>
    'link' in entry && entry.link === '/desarrollo-interfaces';

  // Mantén solo el grupo autogenerado que coincide con la UT actual (+ Inicio).
  route.sidebar = route.sidebar
    .map((entry: any) => {
      if (keepLink(entry)) return entry;// 👈 Mantén el enlace principal de la UT actual

      if(entry.entries != undefined && entry.entries[0].href.includes(match[1])) return entry; 

      return null;
    })
    .filter(Boolean);
});
