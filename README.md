# Portfolio de John Luis Castillo - Aplicación Full Stack
[![Docker Image CI](https://github.com/Johnkl725/RepositorioJohnCR/actions/workflows/docker-image.yml/badge.svg)](https://github.com/Johnkl725/RepositorioJohnCR/actions/workflows/docker-image.yml)
[![Code Quality](https://github.com/Johnkl725/RepositorioJohnCR/actions/workflows/code-quality.yml/badge.svg)](https://github.com/Johnkl725/RepositorioJohnCR/actions/workflows/code-quality.yml)
## 🚀 Arquitectura del Proyecto

### Stack Tecnológico
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Base de Datos**: MongoDB (NoSQL)
- **Containerización**: Docker & Docker Compose
- **Seguridad**: Rate Limiting, Helmet, CORS, Validación de datos

### Principios Aplicados
- ✅ **SOLID Principles**
- ✅ **Repository Pattern**
- ✅ **Service Layer Pattern**
- ✅ **DTO Pattern**
- ✅ **Dependency Injection**

### Características de Seguridad
- 🛡️ **Rate Limiting**: Prevención de DDoS
- 🛡️ **Helmet**: Protección de headers HTTP
- 🛡️ **Input Validation**: Prevención de inyección SQL/NoSQL
- 🛡️ **CORS**: Configuración segura de origen cruzado
- 🛡️ **Sanitización**: Limpieza de datos de entrada
- 🛡️ **Environment Variables**: Gestión segura de credenciales

## 📁 Estructura del Proyecto

```
portfolio-project/
├── frontend/                 # Aplicación Next.js
│   ├── src/
│   │   ├── app/             # App Router de Next.js
│   │   ├── components/      # Componentes React reutilizables
│   │   ├── services/        # Servicios API
│   │   ├── types/           # Tipos TypeScript
│   │   └── utils/           # Utilidades
│   ├── public/              # Archivos estáticos
│   ├── Dockerfile
│   └── package.json
│
├── backend/                  # API REST con Express
│   ├── src/
│   │   ├── controllers/     # Controladores (Capa de presentación)
│   │   ├── services/        # Lógica de negocio
│   │   ├── repositories/    # Acceso a datos
│   │   ├── models/          # Modelos MongoDB
│   │   ├── middlewares/     # Middlewares (seguridad, validación)
│   │   ├── validators/      # Validadores de entrada
│   │   ├── config/          # Configuración
│   │   └── server.ts        # Punto de entrada
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml        # Orquestación de contenedores
└── README.md
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Docker & Docker Compose instalados
- Node.js 18+ (opcional, para desarrollo local)

### Variables de Entorno

**Backend (.env)**
```env
PORT=5000
MONGO_URI=mongodb://mongodb:27017/portfolio
NODE_ENV=production
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🐳 Ejecución con Docker

### Iniciar todos los servicios
```bash
docker-compose up -d
```

### Servicios disponibles
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Comandos útiles
```bash
# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir imágenes
docker-compose up -d --build

# Ejecutar seeds (datos iniciales)
docker-compose exec backend npm run seed
```

## 💾 Gestión de Datos

### Seed de Datos Iniciales
```bash
# Poblar la base de datos con tu información del CV
docker-compose exec backend npm run seed
```

### Backup de MongoDB
```bash
docker-compose exec mongodb mongodump --out=/data/backup
```

### Restaurar Backup
```bash
docker-compose exec mongodb mongorestore /data/backup
```

## 🛠️ Desarrollo Local (Sin Docker)

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📝 API Endpoints

### Experiencia
- `GET /api/experience` - Listar todas las experiencias
- `GET /api/experience/:id` - Obtener una experiencia
- `POST /api/experience` - Crear experiencia
- `PUT /api/experience/:id` - Actualizar experiencia
- `DELETE /api/experience/:id` - Eliminar experiencia

### Proyectos
- `GET /api/projects` - Listar todos los proyectos
- `GET /api/projects/:id` - Obtener un proyecto
- `POST /api/projects` - Crear proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto

### Habilidades
- `GET /api/skills` - Listar todas las habilidades
- `POST /api/skills` - Crear habilidad
- `PUT /api/skills/:id` - Actualizar habilidad
- `DELETE /api/skills/:id` - Eliminar habilidad

### Educación
- `GET /api/education` - Listar educación
- `POST /api/education` - Crear entrada
- `PUT /api/education/:id` - Actualizar
- `DELETE /api/education/:id` - Eliminar

### Perfil
- `GET /api/profile` - Obtener información de perfil
- `PUT /api/profile` - Actualizar perfil

## 🔒 Características de Seguridad Implementadas

1. **Rate Limiting**: 100 requests por 15 minutos por IP
2. **Helmet**: Protección automática de headers HTTP
3. **CORS**: Solo permite orígenes configurados
4. **Validación**: Joi para validar todos los inputs
5. **Sanitización**: Mongo-sanitize para prevenir inyección NoSQL
6. **Express-validator**: Validación adicional en rutas

## 📦 Mantenimiento

### Actualizar tu información
1. Edita los archivos en `/backend/src/data/seed-data.ts`
2. Ejecuta: `docker-compose exec backend npm run seed`

### Agregar nuevas secciones
1. Crea el modelo en `/backend/src/models`
2. Crea el repositorio en `/backend/src/repositories`
3. Crea el servicio en `/backend/src/services`
4. Crea el controlador en `/backend/src/controllers`
5. Registra las rutas en `/backend/src/server.ts`

### Agregar componentes al frontend
1. Crea el componente en `/frontend/src/components`
2. Crea el servicio API en `/frontend/src/services`
3. Importa y usa en las páginas de `/frontend/src/app`

## 🎨 Personalización

### Colores y Estilos
- Edita `tailwind.config.ts` para cambiar la paleta de colores
- Modifica `globals.css` para estilos globales

### Contenido
- Los datos se gestionan desde MongoDB
- Usa el seed script para cargar información inicial
- Panel de administración (opcional) para editar desde UI

## 🚀 Despliegue a Producción

### Recomendaciones
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, DigitalOcean
- **Base de Datos**: MongoDB Atlas

### Variables a configurar en producción
```env
NODE_ENV=production
MONGO_URI=<tu_mongodb_atlas_uri>
CORS_ORIGIN=<tu_dominio_frontend>
```

## 📚 Recursos y Documentación

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contribución

Este es tu portfolio personal. Para agregar nuevas funcionalidades:
1. Crea una rama feature
2. Implementa los cambios
3. Prueba localmente
4. Merge a main

## 📄 Licencia

MIT License - Libre uso para tu portfolio personal

---

**Desarrollado por John Luis Alberto Castillo Reupo**
Data Engineer | UNMSM
