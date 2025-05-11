import express from 'express';
import { weatherController } from '../controller/weatherController.js';

const router = express.Router();

router.get('/weather/:city', weatherController.getWeather);

export default router;
