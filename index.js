import express from 'express';
import dotenv from 'dotenv'; // Importar dotenv para poder usar variables de entorno desde un archivo .env

const app = express();
dotenv.config(); // Cargar las variables de entorno del archivo .env

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola mundo con Express!');
});

// Puerto donde se ejecuta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
