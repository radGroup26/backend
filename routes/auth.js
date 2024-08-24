import express from "express";
import { login, refresh, logout } from '../controllers/auth.js';
import rateLimiter from "../middleware/rateLimiter.js";
import { validateRequestBody } from 'zod-express-middleware';
import { userLoginSchema } from "../schemas/userSchemas.js";
const router = express.Router();
/**
 * @openapi
 * /auth:
 *  post:
 *   summary: Login to the application
 *   tags:
 *    - Auth
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserLoginInput'
 */
router.route('/')
    .post(validateRequestBody(userLoginSchema), rateLimiter, login);
router.route('/refresh')
    .get(refresh);
router.route('/logout')
    .post(logout);
export default router;
