import { OtakuClient } from "#/api/otaku";
import dataSource from "#/db/data-source";
import { ReactionMediaEntity } from "#/entities/reaction-media.entity";
import { ReactionTagEntity, ReactionTagType } from "#/entities/reaction.entity";
import { AsyncTask, SimpleIntervalJob, ToadScheduler } from "toad-scheduler";

export function registerMediaJob() {
  const scheduler = new ToadScheduler();
  const task = new AsyncTask("media sync", async () => {
    const tagsRepo = dataSource.getRepository(ReactionTagEntity);
    const mediaRepo = dataSource.getRepository(ReactionMediaEntity);
    const tags = await tagsRepo.findBy({
      type: ReactionTagType.OtakuApi,
    });

    const otakuClient = OtakuClient.create();

    async function saveMedia(tag: ReactionTagEntity) {
      const reaction = await otakuClient.findSingleReaction(tag.name);

      if (!reaction) {
        return;
      }

      const existed = await mediaRepo.findOneBy({ url: reaction.url });

      if (existed) {
        return;
      }

      await mediaRepo.save({ url: reaction.url, tag: tag });
    }

    for (const tag of tags) {
      for (let i = 0; i < 10; i++) {
        await saveMedia(tag);
      }
    }
  });
  task.execute();
  const job = new SimpleIntervalJob({ minutes: 30 }, task);
  scheduler.addIntervalJob(job);
}
