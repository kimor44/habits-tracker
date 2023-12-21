import {
  getHabits,
  getTodayHabits,
  addHabit,
  updateHabit,
} from "../habits.helper.js";

export const habitsRoute = async (fastify) => {
  // get habits
  fastify.get("/", async (request, reply) => {
    try {
      const habits = await getHabits();

      return habits;
    } catch (error) {
      reply.code(404).send({ error: error.message });
    }
  });

  // get today habits
  fastify.get("/today", async (request, reply) => {
    try {
      const todayHabit = await getTodayHabits();

      return todayHabit;
    } catch (error) {
      reply.code(404).send({ error: error.message });
    }
  });

  // post habit
  fastify.post("/", async (request, reply) => {
    const body = request.body;

    if (body.title === undefined) {
      reply.code(400).send({ error: "Title is required" });
    }

    try {
      const newHabit = await addHabit(request.body.title);

      return newHabit;
    } catch (error) {
      reply.code(404).send({ error: error.message });
    }
  });

  // patch habit
  fastify.patch("/:id", async (request, reply) => {
    const body = request.body;

    if (body.done === undefined) {
      reply.code(400).send({ error: "Done is required" });
    }

    if (typeof body.done !== "boolean") {
      reply.code(400).send({ error: "Done must be a boolean" });
    }

    const habitId = Number(request.params.id);

    try {
      const habitToUpdate = await updateHabit(habitId, body.done);

      return habitToUpdate;
    } catch (error) {
      reply.code(404).send({ error: error.message });
    }
  });
};
