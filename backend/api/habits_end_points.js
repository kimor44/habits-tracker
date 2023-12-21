import { fastify } from "../index.js";

const loadHabitsEndPoints = async () => {
  fastify.get("/habits", async () => {
    return { habits: "habits" };
  });
  // Test si le serveur fonctionne
  fastify.get("/", async () => {
    return { hello: "world" };
  });
};

export { loadHabitsEndPoints };
