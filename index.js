import express from 'express';
import dotenv from 'dotenv'; // Importar dotenv para poder usar variables de entorno desde un archivo .env
import redisClient from './redis/redis.js';
import weatherRoutes from './routes/weatherRoutes.js';
const app = express();
dotenv.config(); // Cargar las variables de entorno del archivo .env
app.use(express.json()); // necesario para leer req.body



app.use(weatherRoutes);


const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await redisClient.connect(); // Conectar a Redis antes de iniciar el servidor
        console.log('✅ Redis conectado');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Error al conectar con Redis:', err);
        process.exit(1); // Detiene la app si Redis falla
    }
})();