
import express from 'express'
import { userRouter } from './user/routes';
import { productRouter } from './product/routes';

const v1Router = express.Router();

v1Router.use('/user', userRouter);
v1Router.use('/product', productRouter);

export { v1Router }