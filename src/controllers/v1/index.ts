import { FastifyInstance } from "fastify";
import { ReactionController } from "./reactions";

export function registerV1Controllers(app: FastifyInstance) {
  ReactionController.create(app);
}
