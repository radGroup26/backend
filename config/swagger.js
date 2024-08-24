import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc';
import { logEvent } from "../middleware/logger.js";
import { getVersion } from "../lib/helper.js";
import zodToJsonSchema from "zod-to-json-schema";
import { userLoginSchema } from "../schemas/userSchemas.js";
userLoginSchema;
const version = getVersion();
const option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rest API docs',
            version
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                UserLoginInput: zodToJsonSchema(userLoginSchema)
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./routes/*.js']
};
const swaggerSpec = swaggerJsdoc(option);
export default function swaggerDocs(app, port) {
    app.use('/api-docs', serve, setup(swaggerSpec));
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    logEvent(`Swagger docs available at http://localhost:${port}/api-docs`, 'reqLog.log');
}
