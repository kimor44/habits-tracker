import { fastify } from "../index.js";
import path from "path";
import fs from "fs/promises";

const habitsPath = path.join(process.cwd(), "./database.json");

const loadHabitsEndPoints = () => {
  // home route
  fastify.get("/", async () => {
    return { hello: "world" };
  });

  // get habits
  fastify.get("/habits", async () => {
    const habitsFile = await fs.readFile(habitsPath);
    return JSON.parse(habitsFile.toString());
  });

  // post habit
  fastify.post("/habits", async (request, reply) => {
    if (typeof request.body !== "object" || request.body === null) {
      throw new Error("Invalid request body");
    }
    const habitsFile = await fs.readFile(habitsPath);
    const habits = JSON.parse(habitsFile.toString());
    const newHabit = {
      id: habits[habits.length - 1]?.id || 0,
      title: request.body.title,
      daysDone: {},
    };
    await fs.writeFile(
      habitsPath,
      JSON.stringify([...habits, newHabit], null, 2)
    );

    reply.status(201).send(newHabit);
  });

  // patch habit
};

export { loadHabitsEndPoints };
