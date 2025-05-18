import axios from 'axios';
import redisClient from '../redis/redis.js';

export class weatherController {
    // Function to obtain the weather
    static async getWeather(req, res) {
        const { city, date1, date2 } = req.params;

        // Verificación de ciudad
        checkCity(city);

        try {

            // Generación de la clave de caché
            let cacheKey = generateCacheKey(city, date1, date2);

            // Intentar obtener los datos de la caché
            const cachedData = await getCachedData(cacheKey);
            if (cachedData) {
                return res.json({ data: cachedData, cached: true });
            }



            // Construcción de la URL según los parámetros de fecha
            let dateParam = "";
            if (date1 && date2) {
                dateParam = `/${date1}/${date2}`;
            } else if (date1) {
                dateParam = `/${date1}`;
            }

            // Solicitar datos a la API externa
            const response = await axios.get(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}${dateParam}?unitGroup=metric&lang=en&key=${process.env.API_KEY}`
            );


            // Asegúrate de que los datos están en el formato esperado
            const daysData = response.data.days;
            const filteredData = daysData.map(dayData => ({
                datetime: dayData.datetime,
                temp: dayData.temp,
                tempmax: dayData.tempmax,
                tempmin: dayData.tempmin,
                humidity: dayData.humidity,
                precipprob: dayData.precipprob,
                sunrise: dayData.sunrise,
                sunset: dayData.sunset,
                description: dayData.description

            }));

            // Guardar la respuesta de la API en Redis con un tiempo de expiración de 1 hora (3600 segundos)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(filteredData));

            // Devolver la respuesta de la API con los datos del clima
            return res.json({ data: filteredData, cached: false });

        } catch (error) {
            // Manejo de errores en caso de fallo con la API o el sistema de caché
            console.error('Error consuming the API:', error);
            res.status(500).json({ error: 'Error retrieving weather data' });
        }
    }
}

function generateCacheKey(city, date1, date2) {
    // Generación de la clave de caché dependiendo de los parámetros
    let cacheKey = `weather:${city.toLowerCase()}`;

    if (date1 && date2) {
        cacheKey = `${cacheKey}:${date1}:${date2}`; // Para un rango de fechas
    } else if (date1) {
        cacheKey = `${cacheKey}:${date1}`; // Solo una fecha
    }
    return cacheKey;
}

async function getCachedData(cacheKey) {
    // Verificar si los datos están en la caché de Redis
    const getResultRedis = await redisClient.get(cacheKey);

    // Si los datos están en la caché, devolverlos sin hacer la solicitud a la API
    if (getResultRedis) {
        return res.json({ data: JSON.parse(getResultRedis), cached: true });
    } else {
        return null;
    }
}

// Función para verificar la validez de la ciudad
function checkCity(city) {
    // Verificar si el parámetro 'city' está presente y tiene un formato válido
    if (!city || !/^[a-zA-Z\s]+$/.test(city)) {
        throw new Error('Invalid city name');
    }
}
