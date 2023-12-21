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
  fastify.patch("/habits/:id", async (request, reply) => {
    if (typeof request.params !== "object" || request.params === null) {
      throw new Error("Invalid request params");
    }
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    const habitsFile = await fs.readFile(habitsPath);
    const habits = JSON.parse(habitsFile.toString());
    const habitId = Number(request.params.id);
    const habitIndex = habits.findIndex((habit) => habit.id === habitId);
    if (habitIndex === -1) {
      throw new Error("Habit not found");
    }
    const habitToUpdate = habits[habitIndex];
    const hasDate = Object.keys(habitToUpdate.daysDone).includes(dateString);
    if (hasDate) {
      delete habitToUpdate.daysDone[dateString];
    } else {
      habitToUpdate.daysDone[dateString] = true;
    }

    await fs.writeFile(
      habitsPath,
      JSON.stringify([...habits, habitToUpdate], null, 2)
    );

    reply.status(200).send(habitToUpdate);
  });
};

export { loadHabitsEndPoints };
