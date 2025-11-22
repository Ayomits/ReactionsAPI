import { FastifyInstance } from "fastify";

export interface Controller {
  register(app: FastifyInstance): void;
}
