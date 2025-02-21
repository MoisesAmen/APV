# APV - Administrador de Pacientes de Veterinaria

## Descripción
APV es una aplicación web full stack diseñada específicamente para clínicas veterinarias que necesitan gestionar sus pacientes de manera eficiente. El sistema permite a los veterinarios administrar citas, mantener registros médicos detallados y dar seguimiento a los tratamientos de las mascotas.

## Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca para construir interfaces de usuario
- **Tailwind CSS**: Framework de CSS utilitario para diseño responsivo
- **Vite**: Build tool y servidor de desarrollo
- **Axios**: Cliente HTTP para peticiones al backend
- **React Router DOM**: Manejo de rutas en la aplicación
- **Context API**: Manejo del estado global
- **React Hook Form**: Manejo y validación de formularios

### Backend
- **Node.js**: Runtime de JavaScript
- **Express**: Framework web para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: JSON Web Tokens para autenticación
- **Bcrypt**: Encriptación de contraseñas
- **Nodemailer**: Envío de emails
- **Cors**: Middleware para manejo de CORS

## Características Principales

### Gestión de Usuarios (Veterinarios)
- Registro con verificación por email
- Autenticación segura con JWT
- Recuperación de contraseña
- Perfil editable con foto
- Panel de control personalizado

### Gestión de Pacientes
- Registro completo de mascotas
  - Información del propietario
  - Historial médico
  - Registro de vacunas
  - Notas de seguimiento
- Búsqueda avanzada de pacientes
- Filtrado por diferentes criterios
- Exportación de datos

### Sistema de Citas
- Calendario interactivo
- Recordatorios automáticos
- Estado de citas (pendiente, completada, cancelada)
- Notas por cita

## Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- MongoDB (v4.4 o superior)
- npm o yarn
- Editor de código (VS Code recomendado)

### Configuración del Entorno

1. **Clonar el Repositorio**:
```bash
git clone [url-del-repositorio]
cd apv
```

2. **Configuración del Backend**:
```bash
cd backend
npm install

# Crear archivo .env con las siguientes variables:
MONGO_URI=tu_conexion_mongodb
JWT_SECRET=tu_secret_key
EMAIL_USER=tu_email_smtp
EMAIL_PASS=tu_password_smtp
FRONTEND_URL=http://localhost:5173
PORT=4000

# Iniciar servidor de desarrollo
npm run dev
```

3. **Configuración del Frontend**:
```bash
cd frontend
npm install

# Crear archivo .env con:
VITE_BACKEND_URL=http://localhost:4000

# Iniciar aplicación
npm run dev
```

## Estructura del Proyecto

```
apv/
├── backend/
│   ├── controllers/
│   │   ├── veterinarioController.js   # Lógica de negocio para veterinarios
│   │   ├── pacienteController.js      # Lógica de negocio para pacientes
│   │   └── authController.js          # Manejo de autenticación
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js          # Verificación de JWT
│   │   ├── checkAuth.js              # Validación de sesiones
│   │   └── errorHandler.js           # Manejador global de errores
│   │
│   ├── models/
│   │   ├── Veterinario.js            # Modelo de datos veterinario
│   │   └── Paciente.js               # Modelo de datos paciente
│   │
│   ├── routes/
│   │   ├── veterinarioRoutes.js      # Rutas de veterinarios
│   │   └── pacienteRoutes.js         # Rutas de pacientes
│   │
│   ├── config/
│   │   ├── db.js                     # Configuración de MongoDB
│   │   └── email.js                  # Configuración de Nodemailer
│   │
│   ├── helpers/
│   │   ├── emailRegistro.js          # Plantillas de emails
│   │   └── generarJWT.js            # Generación de tokens
│   │
│   └── index.js                      # Punto de entrada del servidor
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── auth/                 # Componentes de autenticación
    │   │   │   ├── Login.jsx
    │   │   │   └── Registro.jsx
    │   │   ├── pacientes/            # Componentes de pacientes
    │   │   │   ├── FormularioPaciente.jsx
    │   │   │   └── ListadoPacientes.jsx
    │   │   └── ui/                   # Componentes de interfaz
    │   │       ├── Alert.jsx
    │   │       └── Header.jsx
    │   │
    │   ├── context/
    │   │   ├── AuthProvider.jsx      # Contexto de autenticación
    │   │   └── PacientesProvider.jsx # Contexto de pacientes
    │   │
    │   ├── hooks/
    │   │   ├── useAuth.jsx          # Hook personalizado auth
    │   │   └── usePacientes.jsx     # Hook personalizado pacientes
    │   │
    │   ├── layouts/
    │   │   ├── AuthLayout.jsx       # Layout para auth
    │   │   └── AdminLayout.jsx      # Layout para admin
    │   │
    │   ├── pages/
    │   │   ├── Login.jsx            # Página de login
    │   │   ├── Registro.jsx         # Página de registro
    │   │   ├── AdministrarPacientes.jsx
    │   │   └── perfil/
    │   │       └── EditarPerfil.jsx
    │   │
    │   ├── config/
    │   │   └── axios.js             # Configuración de axios
    │   │
    │   ├── assets/                  # Imágenes y recursos
    │   │
    │   ├── styles/                  # Estilos CSS
    │   │
    │   ├── App.jsx                  # Componente principal
    │   └── main.jsx                 # Punto de entrada
    │
    ├── public/                      # Archivos públicos
    │
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

### Descripción de los Directorios Principales

#### Backend

- **controllers/**: Contiene la lógica de negocio de la aplicación
  - Manejo de operaciones CRUD
  - Validaciones de datos
  - Respuestas HTTP

- **middleware/**: Funciones intermediarias
  - Autenticación y autorización
  - Validación de datos
  - Manejo de errores

- **models/**: Esquemas de MongoDB
  - Definición de estructuras de datos
  - Validaciones a nivel de base de datos
  - Métodos personalizados

- **routes/**: Definición de endpoints API
  - Rutas protegidas y públicas
  - Validación de parámetros
  - Middleware específico de rutas

#### Frontend

- **components/**: Componentes React reutilizables
  - Organizados por funcionalidad
  - Componentes de presentación
  - Componentes contenedores

- **context/**: Manejo de estado global
  - Contextos de autenticación
  - Contextos de datos
  - Estados compartidos

- **hooks/**: Hooks personalizados
  - Lógica reutilizable
  - Manejo de efectos secundarios
  - Abstracción de operaciones comunes

- **layouts/**: Estructuras de página
  - Layouts para diferentes secciones
  - Componentes de navegación
  - Estructuras responsive

## API Endpoints

### Autenticación
- `POST /api/veterinarios`: Registro de veterinario
- `POST /api/veterinarios/login`: Inicio de sesión
- `GET /api/veterinarios/perfil`: Obtener perfil
- `PUT /api/veterinarios/perfil/:id`: Actualizar perfil

### Pacientes
- `GET /api/pacientes`: Listar pacientes
- `POST /api/pacientes`: Crear paciente
- `GET /api/pacientes/:id`: Obtener paciente
- `PUT /api/pacientes/:id`: Actualizar paciente
- `DELETE /api/pacientes/:id`: Eliminar paciente

## Seguridad
- Autenticación mediante JWT
- Passwords hasheados con Bcrypt
- Protección contra XSS
- Validación de datos
- Rate limiting
- CORS configurado

## Testing

### Backend Testing

#### Configuración
```bash
cd backend
npm install --save-dev jest supertest @types/jest
```

#### Pruebas Unitarias
- **Controllers**
  - Autenticación de usuarios
  - Gestión de pacientes
  - Manejo de perfiles
  
- **Middlewares**
  - Verificación de JWT
  - Validación de datos
  - Manejo de errores

- **Helpers**
  - Generación de tokens
  - Funciones de utilidad
  - Validadores

#### Pruebas de Integración
- **API Endpoints**
  - Registro de veterinarios
  - Login y autenticación
  - CRUD de pacientes
  - Actualización de perfiles

#### Comandos de Testing
```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con coverage
npm run test:coverage

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas específicas
npm test veterinario.test.js
```

### Frontend Testing

#### Configuración
```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

#### Pruebas de Componentes
- **Componentes de Autenticación**
  - Formulario de login
  - Registro de usuarios
  - Recuperación de contraseña

- **Componentes de Pacientes**
  - Formulario de pacientes
  - Listado de pacientes
  - Detalles de paciente

- **Componentes UI**
  - Alertas
  - Modales
  - Botones
  - Formularios

#### Pruebas de Integración
- **Flujos de Usuario**
  - Proceso de login completo
  - Registro de nuevo paciente
  - Edición de perfil
  - Gestión de citas

#### Pruebas End-to-End (E2E)
- **Cypress**
  ```bash
  # Instalar Cypress
  npm install --save-dev cypress

  # Ejecutar pruebas E2E
  npm run cypress:open
  ```

- **Escenarios E2E**
  - Flujo completo de registro y login
  - Creación y gestión de pacientes
  - Actualización de información de perfil
  - Navegación general de la aplicación

#### Comandos de Testing Frontend
```bash
# Ejecutar todas las pruebas
npm run test

# Ejecutar pruebas con coverage
npm run test:coverage

# Modo watch
npm run test:watch

# Ejecutar pruebas E2E
npm run test:e2e
```

### Cobertura de Pruebas
- Backend: >80% de cobertura
- Frontend: >75% de cobertura
- E2E: Flujos críticos cubiertos

### Convenciones de Testing
- Nombrado descriptivo de pruebas
- Organización por funcionalidad
- Mocks para servicios externos
- Fixtures para datos de prueba

### CI/CD Testing
- Ejecución automática en pull requests
- Verificación de cobertura mínima
- Tests de regresión
- Reportes automáticos de pruebas

## Despliegue
- Frontend: Vercel/Netlify
- Backend: Railway/Heroku
- Base de datos: MongoDB Atlas

## Contribución
1. Fork del repositorio
2. Crear rama para feature: `git checkout -b feature/NuevaCaracteristica`
3. Commit cambios: `git commit -am 'Añadir nueva característica'`
4. Push a la rama: `git push origin feature/NuevaCaracteristica`
5. Crear Pull Request

## Agradecimientos
- Mencionar colaboradores
- Librerías utilizadas
- Recursos y tutoriales


