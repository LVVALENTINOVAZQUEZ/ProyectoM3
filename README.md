# 📅 ProyectoM3 - Gestión de Turnos

## 🎯 Objetivo del Proyecto
Desarrollar una aplicación web para la **gestión de turnos y reservas**, en la cual los usuarios puedan:
- Registrarse y acceder al sistema 🔑  
- Solicitar turnos 📆  
- Administrar y cancelar reservas ❌  
- Visualizar disponibilidad en tiempo real ✅  

Este proyecto busca simular un sistema de turnos para clínicas, servicios o negocios, aplicando buenas prácticas de arquitectura backend y frontend.

---

## 💻 Tecnologías utilizadas
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=fff&style=for-the-badge)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=fff&style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=fff&style=for-the-badge)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)

---

## ⚙️ Requisitos para instalar

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/LVVALENTINOVAZQUEZ/ProyectoM3.git

2. **Instalar Node.js y npm**

🔹 Backend
1. **Ir a la carpeta del backend**
 
```bash
cd ProyectoM3/back
```
2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno en un archivo .env:**

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=proyectoM3
PORT=3001
```
4. **Compilar TypeScript**

   ```bash
   npm run build
   ```

5. **Iniciar el servidor**
   ```bash
   npm start
   ```
🔹 Frontend

1. **Ir a la carpeta del frontend**

2. **Instalar dependencias**
   ```bash
    npm install
   ```

3. **Levantar el servidor de desarrollo**
  ```bash
   npm run dev
  ```

4. **Build de producción**
   ```bash
   npm run build
   ```

   📌 Notas adicionales
- El backend está desarrollado en TypeScript con Express y TypeORM, conectado a PostgreSQL.
- El frontend está hecho en React con Vite, usando librerías modernas para formularios, alertas y navegación.
- Se recomienda usar migraciones de TypeORM para mantener la base de datos sincronizada.
- El proyecto puede extenderse con autenticación JWT, roles de usuario y panel de administración.

   
