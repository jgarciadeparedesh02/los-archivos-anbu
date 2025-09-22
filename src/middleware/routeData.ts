// src/middleware/routeData.ts
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  const { url, locals } = context;
  const route = locals.starlightRoute;

  if (!route) return;

  // 📍 Detectamos la unidad en la URL
  const match = url.pathname.match(
    /^\/(desarrollo-interfaces|proyecto-integrador|sistemas-big-data)\/(ut\d+)/i
  );
  if (!match) return;

  const subjectPath = match[1]; // 'desarrollo-interfaces' | 'proyecto-integrador'
  const unitSlug = match[2];    // 'ut1', 'ut2', etc.

  // 🔎 Filtramos solo el grupo correspondiente
  const filteredSidebar = route.sidebar
    .map((entry) => {
      // Nos aseguramos de que sea un grupo
      if (entry.type === 'group' && Array.isArray(entry.entries)) {
        // Comprobamos si el href del primer link contiene la unidad actual
        const firstEntry = entry.entries[0];
        if (
          firstEntry &&
          'href' in firstEntry &&
          typeof firstEntry.href === 'string' &&
          firstEntry.href.includes(`/${subjectPath}/${unitSlug}/`)
        ) {
          return entry;
        }
      }
      return null;
    })
    .filter(Boolean);

  // 📝 Solo aplicamos si encontramos algo
  if (filteredSidebar.length > 0) {
    console.log(
      `✅ Sidebar filtrado para ${subjectPath}/${unitSlug}:`,
      JSON.stringify(filteredSidebar, null, 2)
    );
    route.sidebar = filteredSidebar;
  } else {
    console.warn(`⚠️ No se encontró sidebar para ${subjectPath}/${unitSlug}`);
  }
});
