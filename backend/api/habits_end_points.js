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
};

export { loadHabitsEndPoints };
