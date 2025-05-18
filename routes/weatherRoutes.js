import express from 'express';
import { weatherController } from '../controller/weatherController.js';

const router = express.Router();

router.get('/weather/:city', weatherController.getWeather);
router.get('/weather/:city/:date1', weatherController.getWeather);
router.get('/weather/:city/:date1/:date2', weatherController.getWeather);


export default router;
