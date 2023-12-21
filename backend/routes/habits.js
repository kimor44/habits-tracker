import {
  getHabits,
  getTodayHabits,
  addHabit,
  updateHabit,
} from "../habits.helper.js";

export const habitsRoute = async (fastify) => {
  // get habits
  fastify.get("", async () => {
    return getHabits();
  });

  // get today habits
  fastify.get("/today", async () => {
    return getTodayHabits();
  });

  // post habit
  fastify.post("", async (request, reply) => {
    if (typeof request.body !== "object" || request.body === null) {
      throw new Error("Invalid request body");
    }
    await addHabit(request.body.title);
    reply.status(201).send();
  });

  // patch habit
  fastify.patch("/:id", async (request, reply) => {
    if (typeof request.params !== "object" || request.params === null) {
      throw new Error("Invalid request params");
    }
    const habitId = Number(request.params.id);
    const done = JSON.parse(request.body.done);

    await updateHabit(habitId, done);
    reply.status(204).send();
  });
};
