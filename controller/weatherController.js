import axios from 'axios';
import redisClient from '../redis/redis.js';

export class weatherController {
    // Function to obtain the weather
    static async getWeather(req, res) {
        // Get the 'city' parameter from the URL parameters
        const city = req.params.city;
        const date1 = "";
        const date2 = "";
        // Check if the 'city' parameter is present
        if (!city) {
            return res.status(400).json({ error: 'Missing "city" parameter' });
        }

        try {
            // Generate a cache key based on the city name (in lowercase)
            const cacheKey = `weather:${city.toLowerCase()}`;

            // Check if the weather data is available in the Redis cache
            const getResultRedis = await redisClient.get(cacheKey);

            // If the data is in the cache, return it without making a request to the API
            if (getResultRedis) {
                return res.json({ data: JSON.parse(getResultRedis), cached: true });
            }

            // If not in cache, make a request to the external API to get the weather data
            const response = await axios.get(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date1}/${date2}?unitGroup=metric&key=${process.env.API_KEY}`
            );

            // Store the API response in Redis with an expiration time of 1 hour (3600 seconds)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(response.data));

            // Return the API response with the weather data
            return res.json({ data: response.data, cached: false });

        } catch (error) {
            // Handle errors in case of failure with the API or the cache system
            console.error('Error consuming the API:', error);
            res.status(500).json({ error: 'Error retrieving weather data' });
        }
    }
}