const express = require('express');
const dbConnect = require('./config/db');

// Crear el servidor
const app = express();

// Conectar a la base de datos
dbConnect();

// Habilitar express.json
app.use(express.json({ extended: true }))

// Puerto de la app backend
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Inicializar el servidor
app.listen(PORT, () => console.log(`Server up in ${PORT} port`))