import cors from "@fastify/cors";
import Fastify from "fastify";
import { loadHabitsEndPoints } from "./api/habits_end_points.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

loadHabitsEndPoints();

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

export { fastify };
