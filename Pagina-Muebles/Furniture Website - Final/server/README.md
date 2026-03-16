# Backend mínimo para conectar MySQL (contactos)

Instrucciones rápidas para configurar y ejecutar este backend en Windows (PowerShell):

1) Importa la base de datos en MySQL Workbench
   - Abre `sql/contactos.sql` y ejecútalo en MySQL Workbench para crear la base `contactos` y la tabla `contacts`.

2) Configura variables de entorno
   - Crea un archivo `.env` en `server/` basado en `.env.example` y pon tu contraseña real y un `SESSION_SECRET` seguro.

Ejemplo de `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=TU_CONTRASEÑA
DB_NAME=contactos
PORT=3001
SESSION_SECRET=$2b$10$... (usa el hash que generes)
```

3) Instala dependencias y genera hash (PowerShell)

```powershell
cd 'c:\Users\caf32\Downloads\Pagina Web Muebles\Furniture Website - Final\server'
npm install
# Genera un hash para usar como SESSION_SECRET (reemplaza PASSWORD si quieres otra clave):
setx PASSWORD "12345678"
node hash_generator.js
```

Copiar el hash que imprima el script y pegarlo en `SESSION_SECRET` dentro de tu `.env`.

4) Inicia el servidor

```powershell
npm start
```

5) Endpoints disponibles
   - `GET /api/contacts` — devuelve todos los contactos
   - `POST /api/contacts` — crea un contacto. Body: `name`, `email`, `subject`, `message`

Notas:
- Asegúrate de que MySQL esté corriendo y que `DB_USER`/`DB_PASS` sean correctos.
- Si tu frontend se sirve desde otro origen, habilita CORS en `index.js` (añade `cors` middleware).
