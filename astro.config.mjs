// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import vercel from '@astrojs/vercel/serverless';
import starlightImageZoom from 'starlight-image-zoom'
import mermaid from 'astro-mermaid';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [starlight({
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
      },
      {
        label: 'UT1: Análisis del sector y detección de necesidades',
        autogenerate: { directory: 'proyecto-integrador/ut1' },
      },
      {
        label: 'UT2: Diseño del proyecto de la app',
        autogenerate: { directory: 'proyecto-integrador/ut2' },
      },
      {
        label: 'UT3: Definición de la arquitectura y organización técnica',
        autogenerate: { directory: 'proyecto-integrador/ut3' },
      },
      {
        label: 'UT4: Desarrollo iterativo de la app (fase técnica)',
        autogenerate: { directory: 'proyecto-integrador/ut4' },
      },
      {
        label: 'UT5: Seguimiento, control y pruebas finales',
        autogenerate: { directory: 'proyecto-integrador/ut5' },
      },
      {
        label: 'UT6: Presentación y defensa del proyecto',
        autogenerate: { directory: 'proyecto-integrador/ut6' },
      },
      {
        label: 'Recursos Extra',
        autogenerate: { directory: 'proyecto-integrador/ut7' },
      },
      {
        label: 'UT1: Introducción a Big Data y Ecosistema Hadoop',
        autogenerate: { directory: 'sistemas-big-data/ut1' },
      },
      {
        label: 'UT2: Almacenamiento Distribuido con HDFS y NoSQL',
        autogenerate: { directory: 'sistemas-big-data/ut2' },
      },
      {
        label: 'UT3: Procesamiento de Datos con MapReduce y Spark',
        autogenerate: { directory: 'sistemas-big-data/ut3' },
      },
      {
        label: 'UT4: Bases de Datos NoSQL y sus Aplicaciones',
        autogenerate: { directory: 'sistemas-big-data/ut4' },
      },
      {
        label: 'UT5: Ingesta y Procesamiento de Datos en Tiempo Real',
        autogenerate: { directory: 'sistemas-big-data/ut5' },
      },
      {
        label: 'UT6: Visualización y Análisis de Datos con Herramientas BI',
        autogenerate: { directory: 'sistemas-big-data/ut6' },
      },
      {
        label: 'UT7: Cuadros de Mando Programados',
        autogenerate: { directory: 'sistemas-big-data/ut7' },
      },
    ],
    routeMiddleware: './src/middleware/routeData.ts',
    customCss: [
      './src/styles/global.css',
      './src/styles/starlight-custom.css',
    ],

    plugins: [starlightImageZoom()],
  }), react(), mdx(), mermaid({
    theme: 'forest',
    autoTheme: true
  })],
  vite: {
    plugins: [tailwindcss()],
  }
});