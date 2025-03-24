import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import 'dotenv/config';
import { router } from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())
app.use(helmet())
app.use(cookieParser());

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Project Test Ton',
    version: '1.0.0',
    description: 'API documentation for Project EVE',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'accessToken', 
      },
    },
  },
  security: [
    {
      bearerAuth: [], 
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
  ],
};


const specs = swaggerJSDoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/', router)
const port = process.env.PORT || 3000;

app.listen(Number(port), '0.0.0.0', () => {
  console.info('API running in http://0.0.0.0:3000');
})