import { FastifyInstance } from "fastify";
import { registerV1Controllers } from "./v1";

export function registerControllers(app: FastifyInstance) {
  registerV1Controllers(app);
}
