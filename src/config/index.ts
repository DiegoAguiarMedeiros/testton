
import { authConfig } from "./auth";

const isProduction = process.env.TESTTON_IS_PRODUCTION === "true";

export {
  isProduction,
  authConfig
}