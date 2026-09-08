# Sistema de Gestión de Notas – Frontend

Frontend de la aplicación de gestión de estudiantes, profesores y notas académicas.

El proyecto fue desarrollado utilizando Angular y se comunica con los microservicios del backend mediante APIs REST.

## Tecnologías utilizadas

- **Angular 12.2.18** – Framework principal.
- **TypeScript** – Lenguaje de programación.
- **HTML / CSS** – Estructura y estilos de la aplicación.
- **Bootstrap** – Componentes y estilos de interfaz.
- **RxJS** – Manejo de operaciones asíncronas.
- **Angular Router** – Navegación entre vistas.
- **JWT** – Manejo de autenticación mediante tokens.

## Requisitos

Para ejecutar el proyecto se requiere tener instalado:

- **Node.js 14.21.3**
- **npm 6.14.18**
- **Angular CLI 12**

Se puede verificar la versión instalada mediante:

```bash
node --version
npm --version
ng version
```

## Instalación

Clonar el repositorio y acceder a la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd SistemaGestionNotasFront
```
Instalar las dependencias:
```bash
npm install
```

## Configuración

El frontend se encuentra configurado para comunicarse con los microservicios del backend mediante las siguientes URLs:

```text
Usuario.API       https://localhost:7223
Estudiantes.API   https://localhost:7061
Profesores.API    https://localhost:7116
Notas.API         https://localhost:7290
```
Antes de ejecutar el frontend, verificar que los microservicios del backend se encuentren disponibles.


## Ejecución

Para iniciar la aplicación en modo desarrollo:

```bash
ng serve -o
```
La aplicación estará disponible normalmente en:
```text
http://localhost:4200
```

También se puede utilizar:
```bash
npm start
```

## Funcionalidades principales

La aplicación permite:

- Inicio de sesión.
- Autenticación mediante JWT.
- Control de acceso según el rol del usuario.
- Gestión de estudiantes.
- Gestión de profesores.
- Gestión de notas.
- Consulta de notas propias para estudiantes.
- Navegación protegida mediante guards.
- Envío automático del token JWT mediante interceptor.

## Roles

El frontend adapta las opciones disponibles según el rol autenticado:

- **Admin:** acceso completo a estudiantes, profesores y notas.
- **Profesor:** consulta de estudiantes y profesores, y gestión de notas.
- **Estudiante:** consulta únicamente de sus propias notas.

Las restricciones de seguridad definitivas son aplicadas por el backend.

## Estructura básica

```text
src/app/
├── core/
│   ├── guards/
│   ├── interceptors/
│   ├── models/
│   └── services/
│
│
└── features/
    ├── usuarios/
    ├── dashboard/
    ├── estudiantes/
    ├── profesores/
    └── notas/
```

