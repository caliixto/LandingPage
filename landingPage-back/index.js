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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

//creacion carpeta en caso de que no exista

const fs = require('fs');
const path = require('path');

// Asegurar que la carpeta exista al iniciar el servidor
const dir = './uploads/images';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
    console.log("Carpeta de imágenes creada con éxito");
}

// 4. Cargar rutas
const Projectrouter = require("./routers/project");
const Adminrouter = require("./routers/admin");

app.use("/api/admin", Adminrouter);
app.use('/api/project', Projectrouter);

// 5. Ruta base
app.get('/', (req, res) => {
    res.send('¡API de la Landing Page funcionando!');
});

app.listen(port, () => {
    console.log("El servidor está corriendo en el puerto " + port);
});