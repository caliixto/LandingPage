const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

// 1. Conexión a BD
connection();

// 2. Crear el servidor
const app = express();
const port = process.env.PORT || 3977;

// 3. Configurar CORS y, MUY IMPORTANTE, el parseo de datos ANTES de las rutas
app.use(cors());
app.use(express.json()); // <--- ¡Esto debe ir antes de las rutas!
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// 4. Cargar rutas
const Projectrouter = require("./routers/project");
const Adminrouter = require("./routers/admin");
const adminProject = require("./routers/adminProject");

app.use("/api/admin", Adminrouter);
app.use('/api/project', Projectrouter);
app.use('/api/adminProject', adminProject);

// 5. Ruta base
app.get('/', (req, res) => {
    res.send('¡API de la Landing Page funcionando!');
});

app.listen(port, () => {
    console.log("El servidor está corriendo en el puerto " + port);
});