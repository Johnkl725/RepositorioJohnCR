# Arquitectura del Proyecto

## 📐 Visión General

Este proyecto implementa una arquitectura de tres capas (Three-Tier Architecture) con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────────┐
│              FRONTEND (Next.js)                 │
│  - React Components                             │
│  - API Services (Axios)                         │
│  - Type Safety (TypeScript)                     │
└─────────────────────────────────────────────────┘
                      ↓ HTTP/REST
┌─────────────────────────────────────────────────┐
│              BACKEND (Express)                  │
│  - Controllers (Presentation Layer)             │
│  - Services (Business Logic)                    │
│  - Repositories (Data Access)                   │
│  - Middlewares (Security & Validation)          │
└─────────────────────────────────────────────────┘
                      ↓ MongoDB Driver
┌─────────────────────────────────────────────────┐
│            DATABASE (MongoDB)                   │
│  - Collections (Documents)                      │
│  - Indexes                                      │
│  - Schema Validation                            │
└─────────────────────────────────────────────────┘
```

## 🏗️ Patrones de Diseño Aplicados

### 1. Repository Pattern
**Ubicación**: `backend/src/repositories/`

Abstrae el acceso a datos, permitiendo cambiar la implementación sin afectar la lógica de negocio.

```typescript
// BaseRepository proporciona operaciones CRUD genéricas
class BaseRepository<T> {
  findAll()
  findById()
  create()
  update()
  delete()
}

// Repositorios específicos extienden la funcionalidad base
class ExperienceRepository extends BaseRepository<IExperience> {
  getCurrentExperiences()
  getExperiencesByDateRange()
}
```

**Ventajas**:
- ✅ Fácil cambio de base de datos (MongoDB → PostgreSQL)
- ✅ Testing simplificado (mock de repositorio)
- ✅ DRY (Don't Repeat Yourself)

### 2. Service Layer Pattern
**Ubicación**: `backend/src/services/`

Encapsula la lógica de negocio, independiente de la capa de presentación.

```typescript
class ExperienceService {
  // Validaciones de negocio
  // Orquestación de operaciones
  // Transformación de datos
}
```

**Ventajas**:
- ✅ Lógica de negocio centralizada
- ✅ Reutilizable desde diferentes controladores
- ✅ Facilita testing unitario

### 3. Dependency Injection
**Ubicación**: Todo el backend

Los servicios dependen de abstracciones (interfaces) en lugar de implementaciones concretas.

```typescript
// Service depende del repositorio (abstracción)
class ExperienceService {
  constructor(private repository: ExperienceRepository) {}
}
```

**Ventajas**:
- ✅ Bajo acoplamiento
- ✅ Fácil testing (inyección de mocks)
- ✅ Cumple el principio de Inversión de Dependencias (SOLID)

### 4. Singleton Pattern
**Ubicación**: `backend/src/config/`

Garantiza una única instancia de configuración y conexión a BD.

```typescript
class DatabaseConnection {
  private static instance: DatabaseConnection;
  
  public static getInstance(): DatabaseConnection {
    if (!this.instance) {
      this.instance = new DatabaseConnection();
    }
    return this.instance;
  }
}
```

**Ventajas**:
- ✅ Control sobre instanciación
- ✅ Gestión eficiente de recursos
- ✅ Punto de acceso global consistente

### 5. Factory Pattern (Middleware)
**Ubicación**: `backend/src/middlewares/securityMiddleware.ts`

Crea middlewares configurables según el entorno.

```typescript
export const createRateLimiter = () => {
  const config = envConfig.get();
  return rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMaxRequests,
  });
};
```

### 6. DTO (Data Transfer Object) Pattern
**Ubicación**: `frontend/src/types/`

Define estructuras de datos para transferencia entre capas.

```typescript
export interface Experience {
  _id: string;
  company: string;
  position: string;
  // ... más campos
}
```

## 🔒 Principios SOLID Aplicados

### S - Single Responsibility Principle
Cada clase tiene una única responsabilidad:
- `ExperienceController`: Solo maneja HTTP requests/responses
- `ExperienceService`: Solo lógica de negocio
- `ExperienceRepository`: Solo acceso a datos

### O - Open/Closed Principle
`BaseRepository` está abierto a extensión, cerrado a modificación:
```typescript
class ProjectRepository extends BaseRepository<IProject> {
  // Extiende funcionalidad sin modificar BaseRepository
  getFeaturedProjects() { }
}
```

### L - Liskov Substitution Principle
Cualquier repositorio específico puede reemplazar a `BaseRepository`:
```typescript
function processData(repo: BaseRepository<any>) {
  // Funciona con cualquier repositorio
  repo.findAll();
}
```

### I - Interface Segregation Principle
Los clientes no dependen de interfaces que no usan. Cada servicio expone solo métodos relevantes.

### D - Dependency Inversion Principle
Los módulos de alto nivel (Services) no dependen de módulos de bajo nivel (Repositories), sino de abstracciones.

## 🛡️ Seguridad Implementada

### 1. Prevención de DDoS
**Rate Limiting**: Máximo 100 requests por 15 minutos por IP
```typescript
app.use('/api', createRateLimiter());
```

### 2. Prevención de Inyección NoSQL
**Mongo-Sanitize**: Elimina operadores MongoDB de inputs
```typescript
app.use(sanitizeData());
```

### 3. Prevención de XSS
**Sanitización de Inputs**: Limpia scripts maliciosos
```typescript
app.use(sanitizeInput);
```

### 4. Headers de Seguridad
**Helmet**: Configura headers HTTP seguros
```typescript
app.use(helmetConfig);
```

### 5. Validación de Datos
**Joi**: Valida y sanitiza todos los inputs
```typescript
validate(experienceSchema)
```

### 6. CORS Configurado
Solo permite orígenes específicos
```typescript
cors({
  origin: allowedOrigins,
  credentials: true
})
```

## 📊 Flujo de Datos

### CREATE (Ejemplo: Crear Experiencia)

```
1. Frontend
   └─> POST /api/experience
       └─> Body: { company, position, ... }

2. Middleware Stack
   ├─> Rate Limiter ✓
   ├─> Helmet (Security Headers) ✓
   ├─> Body Parser ✓
   ├─> Mongo Sanitize ✓
   ├─> Input Sanitization ✓
   └─> Joi Validation ✓

3. Controller
   └─> ExperienceController.createExperience()
       └─> Recibe request validado

4. Service
   └─> ExperienceService.createExperience()
       ├─> Validaciones de negocio
       │   └─> endDate >= startDate
       └─> Llama al Repository

5. Repository
   └─> ExperienceRepository.create()
       └─> MongoDB INSERT

6. Response
   └─> 201 Created
       └─> { status: 'success', data: experience }
```

### READ (Ejemplo: Listar Experiencias)

```
Frontend → Controller → Service → Repository → MongoDB → Repository → Service → Controller → Frontend
```

## 🔄 Estrategia de Actualización

Cuando necesites agregar/modificar información:

### Opción 1: Vía Script Seed (Recomendado para desarrollo)
```bash
# Edita el archivo seed
nano backend/src/scripts/seed.ts

# Ejecuta el seed
docker-compose exec backend npm run seed
```

### Opción 2: Vía API (Recomendado para producción)
```bash
# Usa Postman/Insomnia o curl
curl -X POST http://localhost:5000/api/experience \
  -H "Content-Type: application/json" \
  -d '{ "company": "...", ... }'
```

### Opción 3: Directamente en MongoDB
```bash
docker-compose exec mongodb mongosh
use portfolio
db.experiences.insertOne({ ... })
```

## 📦 Estrategia de Despliegue

### Desarrollo Local
```bash
docker-compose up -d
```

### Producción Recomendada

**Frontend**: Vercel / Netlify
- Deploy automático desde GitHub
- CDN global
- SSL gratuito

**Backend**: Railway / Render / DigitalOcean
- Contenedor Docker
- Auto-scaling
- Health checks

**Base de Datos**: MongoDB Atlas
- Cluster gratuito M0
- Backups automáticos
- Alta disponibilidad

## 🧪 Testing (Futura Implementación)

```
backend/
  └─ __tests__/
      ├─ unit/
      │   ├─ services/
      │   └─ repositories/
      ├─ integration/
      │   └─ api/
      └─ e2e/
```

## 📈 Escalabilidad

El diseño actual soporta:
- ✅ Separación de microservicios (si crece)
- ✅ Caching layer (Redis)
- ✅ Load balancing (Nginx)
- ✅ Horizontal scaling (múltiples instancias)

## 🔧 Mantenimiento

Para agregar una nueva entidad (ej: "Certifications"):

1. **Modelo**: `backend/src/models/Certification.model.ts`
2. **Repositorio**: `backend/src/repositories/CertificationRepository.ts`
3. **Servicio**: `backend/src/services/CertificationService.ts`
4. **Controlador**: `backend/src/controllers/CertificationController.ts`
5. **Rutas**: `backend/src/routes/certificationRoutes.ts`
6. **Registrar**: `backend/src/server.ts` (agregar ruta)
7. **Frontend**: 
   - `frontend/src/types/index.ts` (tipo)
   - `frontend/src/services/certificationService.ts` (API)
   - `frontend/src/components/Certifications.tsx` (UI)

---

**Desarrollado con 💙 siguiendo las mejores prácticas de arquitectura de software**
