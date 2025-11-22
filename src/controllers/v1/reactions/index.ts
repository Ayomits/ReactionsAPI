import { OtakuClient } from "#/api/otaku";
import { Controller } from "#/utils/types";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export class ReactionController implements Controller {
  constructor(private otakuClient: OtakuClient = OtakuClient.create()) {}

  static create(app: FastifyInstance) {
    const instance = new ReactionController();
    instance.register(app);
    app.log.info("Reaction controller registred");
  }

  register(app: FastifyInstance): void {
    app.register((app, _, done) => {
      app.get("/api/v1/reactions", {
        schema: {
          tags: ["reactions"],
          response: {
            200: {
              type: "object",
              properties: {
                reactions: { type: "array" },
              },
            },
          },
        },
        handler: this.findAllReaction.bind(this),
      });

      app.get("/api/v1/reactions/:id", {
        schema: {
          tags: ["reactions"],
          params: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier of the resource",
              },
            },
            required: ["id"],
          },
          response: {
            200: {
              type: "object",
              properties: {
                reactions: { type: "array" },
              },
            },
          },
        },
        handler: this.findSingleReaction.bind(this),
      });

      done();
    });
  }

  async findSingleReaction(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params as Record<string, string>;
    const reaction = await this.otakuClient.findSingleReaction(params["id"]);
    if (!reaction) {
      return reply.status(404).send({ message: "not found" });
    }

    const url = reaction.url;
    console.log(url);
    return reply.send({
      url: url,
    });
  }

  async findAllReaction(_: FastifyRequest, reply: FastifyReply) {
    const reactions = await this.otakuClient.findAllReactions();
    return reply.send(reactions);
  }
}
