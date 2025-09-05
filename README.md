
# Editor Markdown con Contexto de IA (Gemini)

Este es un editor de Markdown basado en la web con un generador de contexto de IA integrado, impulsado por la API de Gemini. Escribe, previsualiza tu Markdown en tiempo real y obtén información generada por IA sobre el texto que selecciones.

## Características

- **Editor de Markdown**: Escribe y edita archivos de Markdown en una interfaz limpia.
- **Previsualización en vivo**: Ve el HTML renderizado de tu Markdown al instante.
- **Contexto con IA**: Selecciona cualquier texto y obtén un contexto explicativo generado por el modelo Gemini de Google.
- **Soporte para preguntas**: Haz preguntas directas en tu texto (ej. `$¿Qué es React?$`) y obtén respuestas de la IA.
- **Gestión de archivos**: Abre archivos locales, guarda tu trabajo como `.md` o exporta el HTML renderizado.
- **Personalización de fuentes**: Cambia entre fuentes Sans-Serif y Monospace para mayor comodidad.

## Stack Tecnológico

- **Framework**: React 18
- **Lenguaje**: TypeScript
- **Servidor de Desarrollo**: Vite
- **Estilos**: Tailwind CSS
- **IA Generativa**: Google Gemini API
- **Renderizado de Markdown**: Marked.js

## Cómo empezar (Configuración en Crostini / Linux)

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- **Node.js**: Debes tener Node.js instalado. Puedes instalarlo desde el gestor de paquetes de tu distribución (ej. `sudo apt install nodejs npm`).
- **Clave de API de Gemini**: Necesitas una clave de API de Google AI Studio.

### Instalación

1.  **Archivos del Proyecto**: Asegúrate de tener todos los archivos del proyecto en una carpeta.

2.  **Crear el archivo de entorno**: Ya creaste un archivo `.env`. **Renómbralo a `.env.local`**. Este nombre es importante para que Vite lo reconozca.

3.  **Añadir tu clave de API**: Abre el archivo `.env.local` y añade tu clave de la siguiente manera. Asegúrate de que la variable comience con `VITE_`.

    ```
    VITE_API_KEY=TU_CLAVE_DE_API_DE_GEMINI_AQUI
    ```

4.  **Instalar dependencias**: Abre una terminal en la carpeta del proyecto y ejecuta el siguiente comando para instalar todas las librerías necesarias:
    ```bash
    npm install
    ```

5.  **Ejecutar el servidor de desarrollo**: Una vez instaladas las dependencias, inicia la aplicación con:
    ```bash
    npm run dev
    ```

6.  **Abrir la aplicación**: La terminal te mostrará una URL local (normalmente `http://localhost:5173`). Abre esa dirección en tu navegador web.

¡Y listo! Ya tienes el editor funcionando en tu máquina.

## Cómo Usar la Aplicación

1.  **Escribir**: Utiliza el panel izquierdo para escribir o pegar tu contenido en formato Markdown.
2.  **Previsualizar**: El panel central mostrará automáticamente la versión HTML de tu texto.
3.  **Obtener Contexto**:
    - Selecciona una palabra o una frase en el editor de la izquierda.
    - Haz clic en el botón **"Generate Context"** en el panel derecho.
    - La IA analizará el texto seleccionado y mostrará una explicación detallada.
