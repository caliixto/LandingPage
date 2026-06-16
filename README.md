TITULO: Landing Page Full Stack

📝 Descripción
  Esta es una plataforma Full Stack diseñada como una herramienta de gestión y presentación de proyectos. La aplicación permite a los usuarios visualizar ejemplos de proyectos y solicitar presupuestos personalizados mediante un formulario interactivo. Además, cuenta con un panel de administración restringido para la gestión integral de los contenidos.

IMPORTANTE: El acceso al panel de administración está habilitado para fines de demostración. Si deseas probar el panel, contáctame a través de calixto2jcc@gmail.com y te facilitaré las credenciales temporales.

🚀 Características principales
  Formulario de Contacto Reactivo: Integración con EmailJS para el envío de correos electrónicos en tiempo real desde la landing page.
    
  Panel de Administración (Admin Dashboard): Sistema de autenticación seguro para gestionar el contenido de la aplicación.
    
  Funcionalidades de Admin avanzadas:
    
  Sistema de autogestión: Botón de "Restaurar Proyectos" para recuperar el estado inicial de la base de datos tras cualquier borrado.
    
  UX interactiva: Alertas con contador regresivo para notificaciones críticas.
    
  Asistente Inteligente (IA): Integración de un chatbot que resuelve dudas sobre los proyectos, ofrece información sobre el desarrollador y guía al usuario para establecer contacto.
    
  Gestión Multi-idioma: Adaptación del contenido (español, inglés, francés) mediante archivos JSON.

  ## 📸 Vista Previa

  **Pantalla Principal**
    <img width="600" alt="landing" src="https://github.com/user-attachments/assets/dce190c4-8453-4b38-852a-a96f26c82bbd" />
    
  **Formulario de Contacto**
    <img width="600" alt="form_contacto" src="https://github.com/user-attachments/assets/8b34cd9d-a34b-4754-a360-bba242127c9d" />
    
  **Panel de Administración**
    <img width="600" alt="admin_panel" src="https://github.com/user-attachments/assets/2fef7eb1-0304-4db2-8bfc-48d510a5a3d9" />

🛠 Tech Stack
  Frontend
    Framework: Angular
    UI/UX: SweetAlert2 (para alertas y notificaciones)

 Backend & Database
    Servidor: Node.js con Express

Base de Datos: MongoDB Atlas (gestionado con Mongoose)


Servicios y Cloud
    Imágenes: Cloudinary (almacenamiento y optimización de imágenes en la nube)

Despliegue: Vercel (Frontend) y Render (Backend)

## ⚙️ Cómo ejecutar el proyecto

Para ejecutar el proyecto en tu entorno local, asegúrate de tener instalado [Node.js](https://nodejs.org/) y [MongoDB](https://www.mongodb.com/).

1. **Clona el repositorio**:
   `git clone https://github.com/caliixto/LandingPage.git`

2. **Instala las dependencias**:
   - Accede a la carpeta del backend y ejecuta: `npm install`
   - Accede a la carpeta del frontend y ejecuta: `npm install`

3. **Configuración**:
   - Crea un archivo `.env` en el backend con tus credenciales de MongoDB, Cloudinary y EmailJS.

4. **Ejecuta la aplicación**:
   - Inicia el servidor backend (`node index.js` o `npm start`).
   - Inicia el cliente frontend (`ng serve`).
