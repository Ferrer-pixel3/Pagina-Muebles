# Muebles Ferrer - Sitio Web Completo

Sistema completo de e-commerce para tienda de muebles con carrito de compras, autenticación, panel de administración y almacenamiento en MySQL.

## 📋 Requisitos

- **Node.js** (v14 o superior)
- **MySQL** (v5.7 o superior)
- **npm** (incluido con Node.js)
- **VS Code Live Server** (extensión para servir frontend)

## 🚀 Instalación Rápida

### 1. Configurar Base de Datos

Ejecuta los siguientes scripts SQL en MySQL Workbench (en orden):

```
1. sql/create_purchases_furniture_db.sql
2. sql/create_users_furniture_db.sql  
3. sql/add_admin_role.sql
4. sql/add_address_to_purchases.sql
```

O usa el script Node helper desde `server/`:

```powershell
cd server
node run_sql.js "..\sql\create_purchases_furniture_db.sql"
node run_sql.js "..\sql\create_users_furniture_db.sql"
node run_sql.js "..\sql\add_admin_role.sql"
node run_sql.js "..\sql\add_address_to_purchases.sql"
```

### 2. Configurar Admin

Genera contraseña para el usuario admin (desde `server/`):

```powershell
node set_admin_password.js "TuContraseña123"
```

Credenciales por defecto:
- **Email:** `admin@ferrer.com`
- **Contraseña:** (la que configures arriba)

### 3. Instalar Dependencias Node

```powershell
cd server
npm install
```

### 4. Iniciar Servidor

```powershell
npm start
```

Debes ver:
```
Connected to MySQL.
Server listening on http://localhost:3001
```

### 5. Servir Frontend

Abre en VS Code:
- Click derecho en `index.html` → "Open with Live Server"
- O instala la extensión "Live Server" y úsala

Frontend estará disponible en: `http://127.0.0.1:5500`

## 📍 Rutas de API

Todas las rutas están centralizadas en `CONFIG.API_URL` = `http://127.0.0.1:3001/api`

### Autenticación

- `POST /login` - Iniciar sesión
- `POST /register` - Registrar usuario
- `POST /logout` - Cerrar sesión
- `GET /me` - Obtener usuario actual

### Compras (Usuario)

- `POST /purchases` - Crear compra (nombre, email, teléfono, dirección, ubicación)
- `GET /purchases` - Ver historial de compras (requiere autenticación)

### Admin

- `GET /admin/purchases` - Listar todas las compras (requiere admin)
- `PUT /admin/purchases/:id` - Editar compra
- `DELETE /admin/purchases/:id` - Eliminar compra

### Contacto

- `POST /contacts` - Enviar mensaje de contacto
- `GET /contacts` - Ver todos los contactos

## 🎯 Flujo de Usuario

1. **Nuevo usuario:** Ir a `http://127.0.0.1:5500/register.html`
2. **Login:** Ir a `http://127.0.0.1:5500/login.html`
3. **Compra:**
   - Agregar productos al carrito desde `productos.html`
   - Ir a `carrito.html`
   - Click en "Proceder al pago"
   - Rellenar formulario (nombre, email, teléfono, dirección, ubicación)
   - Confirmar compra
4. **Admin:** Acceder a `http://127.0.0.1:5500/admin-login.html` con credenciales admin → `admin.html`

## 🔧 Configuración Personalizada

Para cambiar la URL del servidor API:

1. Edita `config.js` en la raíz del proyecto
2. O modifica `CONFIG.API_URL` en cada archivo HTML/JS donde aparezca

Ejemplo:
```javascript
const CONFIG = { 
  API_URL: 'http://tu-servidor.com/api'  // Cambiar aquí
};
```

## 📊 Estructura de Base de Datos

### Tabla: `users`
- `id`, `name`, `email`, `password_hash`, `role`, `created_at`

### Tabla: `purchases`
- `id`, `user_id`, `buyer_name`, `buyer_email`, `phone`, `address`, `location`, `total_amount`, `created_at`

### Tabla: `purchase_items`
- `id`, `purchase_id`, `product_id`, `product_name`, `unit_price`, `quantity`, `subtotal`

### Tabla: `contacts`
- `id`, `name`, `email`, `subject`, `message`, `created_at`

## 🔐 Seguridad (Notas)

- Cambiar `SESSION_SECRET` en `server/index.js` en producción
- Usar HTTPS en lugar de HTTP
- Usar un store de sesiones persistente (Redis/DB) en producción
- Validar y sanitizar entrada en cliente y servidor

## 📝 Archivos Clave

- `server/index.js` - Backend principal
- `main.js` - Lógica frontend compartida
- `style.css` - Estilos globales
- `config.js` - Configuración centralizada
- `admin.html / admin-login.html` - Panel de administración

## 🆘 Troubleshooting

**Error: "mysql.exe no se reconoce"**
- Usa `node run_sql.js` en lugar de `mysql` CLI

**Error: "Cannot find module 'cors'"**
- Ejecuta `npm install` en carpeta `server/`

**Error: "Admin required" en panel admin**
- Confirma que inició sesión como admin (`role='admin'` en DB)
- Reinicia sesión desde `admin-login.html`

**Las imágenes se ven recortadas**
- Las imágenes usan `object-fit: contain` para mostrar completas
- Ajusta altura en `style.css` si es necesario (`.pricing-card img { height: ... }`)

## 📞 Soporte

Para más ayuda, revisa los comentarios en los archivos de código o contacta al equipo de desarrollo.

---

**Versión:** 1.0  
**Última actualización:** Dic 2025
