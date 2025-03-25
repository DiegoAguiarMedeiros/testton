import express from 'express'
import { createUserController } from '../../controllers/user/create';
import { loginController } from '../../controllers/user/login';

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
 * /user/me:
 *   get:
 *     summary: Login a user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
// userRouter.get('/me',
//   middleware.ensureAuthenticated(),
//   (req, res) => getMeController.execute(req, res)
// )

export { userRouter };