# 🚀 Guía de Inicio Rápido

## Prerequisitos
- Docker y Docker Compose instalados
- Puertos disponibles: 3000 (Frontend), 5000 (Backend), 27017 (MongoDB)

## ⚡ Inicio en 3 Pasos

### 1. Configurar Variables de Entorno

```bash
# Backend
cd backend
cp .env.example .env
# Edita .env si es necesario (opcional para desarrollo local)

# Frontend
cd ../frontend
cp .env.local.example .env.local
# Por defecto apunta a http://localhost:5000/api (correcto para Docker)
```

### 2. Levantar los Servicios

```bash
# Desde la raíz del proyecto
cd ..
docker-compose up -d
```

Esto iniciará:
- 🗄️ **MongoDB** en puerto 27017
- 🔧 **Backend API** en puerto 5000
- 🎨 **Frontend** en puerto 3000

### 3. Cargar Datos Iniciales

```bash
# Espera 30 segundos a que MongoDB esté listo, luego:
docker-compose exec backend npm run seed
```

## ✅ Verificación

Abre tu navegador en: **http://localhost:3000**

Deberías ver tu portfolio completamente funcional con:
- ✅ Perfil personal
- ✅ Experiencia profesional
- ✅ Proyectos
- ✅ Habilidades técnicas
- ✅ Educación
- ✅ Información de contacto

## 🔍 Verificar Servicios

### Backend API
```bash
curl http://localhost:5000/health
# Debería responder: {"status":"success","message":"Server is running",...}
```

### MongoDB
```bash
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

### Frontend
Abre http://localhost:3000 en tu navegador

## 📝 Actualizar Tu Información

### Método 1: Editar Script Seed (Recomendado para desarrollo)

```bash
# 1. Edita el archivo seed con tu información
nano backend/src/scripts/seed.ts

# 2. Vuelve a ejecutar el seed
docker-compose exec backend npm run seed
```

### Método 2: Usar la API directamente

```bash
# Ejemplo: Actualizar perfil
curl -X PUT http://localhost:5000/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Tu Nombre",
    "title": "Tu Título",
    "email": "tu@email.com",
    "phone": "123456789",
    "location": "Tu Ciudad",
    "summary": "Tu resumen profesional..."
  }'
```

## 🛑 Detener Servicios

```bash
docker-compose down
```

## 🔄 Reconstruir Contenedores

Si modificas el código:

```bash
docker-compose down
docker-compose up -d --build
```

## 📊 Ver Logs

```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo frontend
docker-compose logs -f frontend
```

## 🐛 Solución de Problemas

### Puerto ya en uso
```bash
# Ver qué proceso usa el puerto
lsof -i :3000
lsof -i :5000
lsof -i :27017

# Detener el proceso o cambiar el puerto en docker-compose.yml
```

### MongoDB no conecta
```bash
# Verificar que MongoDB esté corriendo
docker-compose ps

# Revisar logs de MongoDB
docker-compose logs mongodb

# Espera más tiempo (primera vez puede tardar)
sleep 30
docker-compose exec backend npm run seed
```

### Frontend no carga datos
```bash
# Verificar que el backend esté corriendo
curl http://localhost:5000/health

# Verificar que hay datos en MongoDB
docker-compose exec mongodb mongosh
use portfolio
db.profiles.find()
db.experiences.find()
```

### Error al hacer seed
```bash
# Asegúrate de que MongoDB esté completamente iniciado
docker-compose logs mongodb | grep "Waiting for connections"

# Si ves el mensaje, MongoDB está listo. Intenta el seed nuevamente
docker-compose exec backend npm run seed
```

## 🎓 Siguientes Pasos

1. **Personaliza tu información**: Edita `backend/src/scripts/seed.ts`
2. **Agrega tu foto**: Sube una imagen y actualiza `profileImageUrl` en el perfil
3. **Conecta tus redes**: Agrega URLs de LinkedIn y GitHub en el perfil
4. **Agrega más proyectos**: Usa la API o edita el seed script
5. **Personaliza colores**: Edita `frontend/tailwind.config.ts`

## 📚 Documentación Adicional

- **README.md**: Documentación completa del proyecto
- **ARCHITECTURE.md**: Arquitectura y patrones de diseño
- **API Endpoints**: Ver README.md sección "API Endpoints"

## 🚀 Deploy a Producción

Ver **README.md** sección "Despliegue a Producción"

---

**¿Problemas?** Revisa los logs con `docker-compose logs -f` o consulta ARCHITECTURE.md
