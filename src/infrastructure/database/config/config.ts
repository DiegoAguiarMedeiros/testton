import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  TESTTON_DB_USER,
  TESTTON_DB_PASS,
  TESTTON_DB_HOST_DOCKER,
  TESTTON_DB_NAME,
  TESTTON_DB_DIALECT,
  TESTTON_DB_PORT
} = process.env;

const sequelize = new Sequelize(TESTTON_DB_NAME as string, TESTTON_DB_USER as string, TESTTON_DB_PASS as string, {
  host: TESTTON_DB_HOST_DOCKER,
  dialect: TESTTON_DB_DIALECT as any,
  port: Number(TESTTON_DB_PORT),
  logging: false,
});

export default sequelize;