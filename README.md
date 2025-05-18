# Weather App

## Descripción

Esta aplicación proporciona información meteorológica utilizando la API de VisualCrossing y Redis para el almacenamiento en caché. Permite consultar las condiciones climáticas de una ciudad para una fecha específica o un rango de fechas, con la capacidad de almacenar en caché los resultados para mejorar la eficiencia y reducir las solicitudes a la API externa.

## Tecnologías

- **Node.js**: Entorno de ejecución para JavaScript en el backend.
- **Express**: Framework para crear aplicaciones web en Node.js.
- **Axios**: Cliente HTTP para realizar solicitudes a la API externa de clima.
- **Redis**: Base de datos en memoria para almacenamiento en caché de datos.
- **VisualCrossing API**: API para obtener datos meteorológicos.

## Endpoints

### 1. Obtener el clima de una ciudad para una fecha específica
GET /weather/:city/:date1


- **Parámetros**:
  - `city`: El nombre de la ciudad para la que se quiere consultar el clima.
  - `date1`: La fecha específica en formato `YYYY-MM-DD` para la cual obtener el clima.

- **Ejemplo**:
GET /weather/Barcelona/2025-05-19


### 2. Obtener el clima de una ciudad para un rango de fechas
- **Parámetros**:
  - `city`: El nombre de la ciudad para la cual se desea obtener el clima.
  - `date1`: La fecha de inicio del rango (en formato `YYYY-MM-DD`).
  - `date2`: La fecha final del rango (en formato `YYYY-MM-DD`).

- **Ejemplo**:
GET /weather/Barcelona/2025-05-19/2025-05-21



## Instalación

### 1. Clonar el repositorio
git clone https://github.com/usuario/weather-app.git
cd weather-app


### 2. Instalar dependencias
Asegúrate de tener Node.js instalado en tu máquina. Luego, instala las dependencias del proyecto:
npm install


### 3. Configurar el archivo `.env`
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
API_KEY=your_visualcrossing_api_key
REDIS_HOST=localhost
REDIS_PORT=6379


- **API_KEY**: La clave de API de VisualCrossing que puedes obtener en [VisualCrossing Weather API](https://www.visualcrossing.com/weather-api).
- **REDIS_HOST**: Dirección del servidor de Redis.
- **REDIS_PORT**: Puerto de Redis.

### 4. Iniciar el servidor
npm start


El servidor se ejecutará en `http://localhost:3000`.

## Uso
La API está disponible en el siguiente formato:

- **Obtener el clima de una ciudad para una fecha**:

  Realiza una solicitud GET a la URL `/weather/:city/:date1`, donde `city` es el nombre de la ciudad y `date1` es la fecha en formato `YYYY-MM-DD`.

- **Obtener el clima de una ciudad para un rango de fechas**:

  Realiza una solicitud GET a la URL `/weather/:city/:date1/:date2`, donde `city` es el nombre de la ciudad, `date1` es la fecha de inicio, y `date2` es la fecha final del rango (en formato `YYYY-MM-DD`).

Ejemplo:




