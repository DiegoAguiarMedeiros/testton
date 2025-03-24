
import express from 'express'
import { userRouter } from './user/routes';

const v1Router = express.Router();

v1Router.use('/user', userRouter);

export { v1Router }