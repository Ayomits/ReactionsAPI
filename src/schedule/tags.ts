import { OtakuClient } from "#/api/otaku";
import dataSource from "#/db/data-source";
import { ReactionTagEntity, ReactionTagType } from "#/entities/reaction.entity";
import { AsyncTask, SimpleIntervalJob, ToadScheduler } from "toad-scheduler";
import { In } from "typeorm";

export function registerTagsJob() {
  const scheduler = new ToadScheduler();
  const task = new AsyncTask("tags collector", async () => {
    const otakuClient = OtakuClient.create();
    const reactions = await otakuClient.findAllReactions();

    const tagsRepo = dataSource.getRepository(ReactionTagEntity);

    const existed = await tagsRepo.findBy({
      name: In(reactions?.reactions ?? []),
    });

    const existedTags = existed.map((e) => e.name);

    const tags =
      reactions?.reactions
        .filter((r) => !existedTags.includes(r))
        .map((r) => ({ name: r, type: ReactionTagType.OtakuApi })) ?? [];
    await tagsRepo.save(tags);
  });
  task.execute();
  const job = new SimpleIntervalJob({ minutes: 30 }, task);
  scheduler.addIntervalJob(job);
}
