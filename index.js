const express = require('express');
const dbConnect = require('./config/db');
const { ApolloServer } = require("apollo-server-express");

//Schema
const typeDefs = require('./graphQl/schema');
//Resolvers
const resolvers = require('./graphQl/resolvers');

// Crear el servidor
const app = express();

// Conectar a la base de datos
dbConnect();

// Habilitar express.json
app.use(express.json({ extended: true }))

// Puerto de la app backend
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app })

// importar rutas
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/project'));

// Inicializar el servidor
app.listen(PORT, () => console.log(`Server up in ${PORT} port`))