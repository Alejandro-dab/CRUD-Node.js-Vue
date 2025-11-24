# 📦 Sistema de inventario de obra: CRUD Full Stack Node.js - Vue

Sistema de Inventario de Obra es una aplicación web Full-Stack diseñada para el control administrativo de insumos y materiales de construcción. Este proyecto representa una implementación moderna de la arquitectura SPA (Single Page Application), desacoplando completamente la lógica del servidor (**Backend API**) de la interfaz de usuario (**Frontend-Vue**), garantizando una experiencia fluida, escalable y mantenible.

Este proyecto **elimina las recargas de página** mediante un enrutamiento inteligente del lado del cliente y una comunicación asíncrona robusta con el servidor.

--

## ✨ Características Clave (Arquitectura & Funcionalidad)
*  Arquitectura Desacoplada (Client-Server): El sistema opera con una separación estricta de responsabilidades. El Backend (Node/Express) actúa puramente como proveedor de datos (API REST), mientras que el Frontend (Vue 3) consume estos datos para renderizar una interfaz reactiva.
*  Gestión de Estado Reactivo (Vue 3 Composition API): Utiliza la sintaxis moderna <script setup> y ref para un enlace de datos bidireccional (Two-Way Data Binding). Cualquier cambio en el inventario se refleja instantáneamente en la UI sin necesidad de refrescar el navegador.
*  Formularios Inteligentes y Reutilizables: Implementación de un diseño eficiente donde una única vista (FormView.vue) detecta dinámicamente el contexto (Creación vs. Edición) basándose en los parámetros de la URL (vue-router), adaptando su comportamiento y peticiones HTTP (POST vs. PUT) automáticamente.
* Seguridad y Modernización de Base de Datos: Integración del driver mysql2 para soportar los protocolos de autenticación modernos de MySQL 8 (caching_sha2_password), asegurando compatibilidad y seguridad de grado industrial, junto con gestión de variables de entorno (dotenv).
* UX/UI Dark Mode Personalizado: Interfaz diseñada desde cero con CSS Scoped, implementando un modo oscuro ergonómico con paleta de colores de alto contraste (Verde Vue/Gris Profundo) para reducir la fatiga visual en entornos de administración.
* Comunicación Cross-Origin (CORS): Configuración segura del middleware CORS en el servidor para permitir el intercambio de recursos entre distintos puertos de desarrollo (Frontend :5173 <-> Backend :7000).

--

## 🛠️ Stack Tecnológico
Este proyecto utiliza un stack moderno enfocado en el alto rendimiento y la experiencia de desarrollo (DX).

### Backend (API RESTful)
* Node.js & Express: Entorno de ejecución y framework minimalista para la construcción de una API rápida y escalable.
* MySQL (Relacional): Base de datos para la persistencia estructurada de los insumos de obra.
* MySQL2 Driver: Cliente de base de datos optimizado que soporta promesas y la encriptación moderna de contraseñas.
* Dotenv: Gestión de secretos y variables de entorno para evitar hardcoding de credenciales.
* Nodemon: Herramienta de desarrollo para el reinicio automático del servidor (Hot Reloading).

### Frontend (Cliente SPA)
* Vue.js 3: Framework progresivo utilizado con Composition API para una lógica de componentes limpia y modular.
* Vite: Herramienta de construcción de próxima generación que ofrece tiempos de inicio instantáneos y reemplazo de módulos en caliente (HMR).
* Vue Router: Sistema de enrutamiento oficial para la navegación SPA (Single Page Application).
* Axios: Cliente HTTP basado en promesas para la comunicación asíncrona con el Backend.
* CSS3 Scoped: Estilos encapsulados por componente para evitar conflictos visuales y mantener el código modular.

## 🚀 Instalación y Puesta en Marcha
### Requisitos Previos
* Node.js instalado (v18 o superior recomendado).
* Servidor MySQL corriendo (XAMPP o Workbench).

### Pasos de Instalación
1. Clonar el Repositorio

Bash: 
git clone [URL_DE_TU_REPOSITORIO]
cd CRUD-NODE.js-VUE

2. Configurar Base de Datos Ejecuta el siguiente script SQL en tu gestor de base de datos para crear la estructura e insertar datos semilla:

SQL: 
CREATE DATABASE IF NOT EXISTS Suministros;
USE Suministros;

CREATE TABLE Existencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

//Pruebas
INSERT INTO Existencias (descripcion, precio, stock) VALUES ('Varillas 3/8', 120.00, 1350);
INSERT INTO Existencias (descripcion, precio, stock) VALUES ('Cemento Cruz Azul', 344.50, 983);

3. Configurar Variables de Entorno (Backend) Crea un archivo llamado .env dentro de la carpeta CRUD_Node.js con el siguiente contenido:
.env: 

PUERTO=7000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=Suministros
DB_PORT=3306

4. Instalar Dependencias y Ejecutar Este proyecto requiere correr dos terminales simultáneamente:

Terminal 1: Backend (API)
Bash: 
cd CRUD_Node.js
npm install
npm run dev
(Deberás ver: "Servidor Ok en puerto: 7000" y "Conectado a la Base de Datos")

Terminal 2: Frontend (Vue)

Bash: 
cd CRUD_Vue
npm install
npm run dev
(Deberás ver: "Local: http://localhost:5173/")

5. ¡Listo! Abre tu navegador en http://localhost:5173 para utilizar el sistema.