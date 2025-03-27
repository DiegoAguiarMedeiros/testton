import express from 'express'
import { middleware } from '../..';
import productController from '../../controllers/product';
import { rateLimiter } from '../../../../shared/RateLimiter';

const productRouter = express.Router();

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all Products with pagination and sorting
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [description, price, quantity]
 *         description: Column name to order by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort direction (ascending or descending)
 *     responses:
 *       200:
 *         description: Paginated list of Products
 *       401:
 *         description: Unauthorized
 */

productRouter.get('/',
  middleware.ensureAuthenticated(),
  rateLimiter,
  (req, res) => productController.getAll.execute(req, res)
);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a Product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Product Description
 *               price:
 *                 type: number
 *                 description: Product price 
 *               quantity:
 *                 type: number
 *                 description: Product quantity
 *     responses:
 *       200:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 */

productRouter.post('/',
  middleware.ensureAuthenticated(),
  (req, res) => productController.create.execute(req, res)
)


/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a Product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */

productRouter.delete(
  '/:id',
  middleware.ensureAuthenticated(),
  (req, res) => productController.delete.execute(req, res)
);

/**
 * @swagger
 * /product/{id}:
 *   patch:
 *     summary: Update a Product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Product Description
 *               price:
 *                 type: number
 *                 description: Product price
 *               quantity:
 *                 type: number
 *                 description: Products Quantity
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */


productRouter.patch(
  '/:id',
  middleware.ensureAuthenticated(),
  (req, res) => productController.update.execute(req, res)
);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a Product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */

productRouter.get(
  '/:id',
  middleware.ensureAuthenticated(),
  rateLimiter,
  (req, res) => productController.get.execute(req, res)
);

export { productRouter };