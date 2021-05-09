const mongoose = require('mongoose');
require('dotenv').config({path: 'local.env'});

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      //Evitan mensajes inecesarios en la consola
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log('DB Connected');
  } catch (error) {
    console.log(error)
    process.exit(1); // Detiene la app  
  }
}

module.exports = dbConnect;