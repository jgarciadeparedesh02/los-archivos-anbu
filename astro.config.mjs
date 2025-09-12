// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  integrations: [
    starlight({
      title: 'Los Archivos Anbu',
      logo: {
        src: './src/assets/logo/logo.png',
        alt: 'Logo Los Archivos Anbu',
      },
      sidebar: [
        {
          label: 'UT1: Diseño de Interfaces y Usabilidad',
          autogenerate: { directory: 'desarrollo-interfaces/ut1' },
        },
        {
          label: 'UT2: Interfaces declarativas con XML y frameworks',
          autogenerate: { directory: 'desarrollo-interfaces/ut2' },
        },
        {
          label: 'UT3: Creación y manejo de componentes con Angular-Ionic',
          autogenerate: { directory: 'desarrollo-interfaces/ut3' },
        },
        {
          label: 'UT4: Reportes en Angular',
          autogenerate: { directory: 'desarrollo-interfaces/ut4' },
        },
        {
          label: 'UT5: Documentación y StoryBook',
          autogenerate: { directory: 'desarrollo-interfaces/ut5' },
        },
        {
          label: 'UT6: Empaquetado e instalación de aplicaciones',
          autogenerate: { directory: 'desarrollo-interfaces/ut6' },
        },
        {
          label: 'UT7: Realización de pruebas',
          autogenerate: { directory: 'desarrollo-interfaces/ut7' },
        }
      ],
      routeMiddleware: './src/middleware/routeData.ts',
      customCss: [
        './src/styles/starlight-custom.css',
      ],
    }),
    react(),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
  }
});