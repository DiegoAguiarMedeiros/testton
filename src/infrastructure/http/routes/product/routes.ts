import express from 'express'
import { middleware } from '../..';
import { createProductController } from '../../controllers/product/create';
import { getAllIncomeController } from '../../controllers/product/getAll';
import { getIncomeByIdController } from '../../controllers/product/getById';
import { deleteProductController } from '../../controllers/product/delete';
import { updatedProductController } from '../../controllers/product/update';

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
 *           enum: [description, price,payment_day]
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
  (req, res) => getAllIncomeController.execute(req, res)
);


/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create Product
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
 *                 description: Name of the cardholder
 *               price:
 *                 type: number
 *                 description: Amount of debt
 *               quantity:
 *                  type: number
 *                  description: Payment Day
 *     responses:
 *       200:
 *         description: Debt created successfully
 *       401:
 *         description: Unauthorized
 */

productRouter.post('/',
  middleware.ensureAuthenticated(),
  (req, res) => createProductController.execute(req, res)
)


/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete an Product
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
  (req, res) => deleteProductController.execute(req, res)
);

/**
 * @swagger
 * /product/{id}:
 *   patch:
 *     summary: Update an Product
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
 *                 description: Description of Product
 *               price:
 *                 type: number
 *                 description: price of Product
 *               quantity:
 *                  type: number
 *                  description: quantity
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
  (req, res) => updatedProductController.execute(req, res)
);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get an Product by ID
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
  (req, res) => getIncomeByIdController.execute(req, res)
);

export { productRouter };