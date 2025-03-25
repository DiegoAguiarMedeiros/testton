import express from 'express'
import { createUserController } from '../../controllers/user/create';
import { loginController } from '../../controllers/user/login';
import { getUserController } from '../../controllers/user/get';
import { middleware } from '../..';

const userRouter = express.Router();

/**
 * @swagger
 * /user/resgistration:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
userRouter.post('/resgistration',
  (req, res) => createUserController.execute(req, res)
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
userRouter.post('/login',
  (req, res) => loginController.execute(req, res)
)

/**
 * @swagger
 * /user/info:
 *   get:
 *     summary: Get User Info
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User Info
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/info',
  middleware.ensureAuthenticated(),
  (req, res) => getUserController.execute(req, res)
)

export { userRouter };