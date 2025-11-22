import fastify from "fastify";
import { AppConfig } from "./config";
import { createDbConnection } from "./db/data-source";
import { registerControllers } from "./controllers";
import { registerTagsJob } from "./schedule/tags";
import { registerMediaJob } from "./schedule/media";

async function start() {
  AppConfig.init();

  const app = fastify({
    logger: {
      transport: {
        target: "@subnoto/fastify-logger",
      },
    },
  });

  app.register(require("@fastify/swagger"), {
    swagger: {
      info: {
        title: "My Fastify API",
        description: "API documentation for my Fastify application",
        version: "1.0.0",
      },
    },
  });

  app.register(require("@fastify/swagger-ui"), {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
  });

  await createDbConnection(app.log);
  registerControllers(app);
  registerTagsJob();
  registerMediaJob()

  app.listen({
    port: AppConfig.port,
    host: AppConfig.host,
  });
}

void start();
