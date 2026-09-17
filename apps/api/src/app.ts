import Fastify from "fastify";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { usuarioRoutes } from "./routes/route.usuarios";

export const app = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST"],
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(usuarioRoutes);

app.listen(
  {
    port: Number(process.env.PORT) || 3000,
    host: "0.0.0.0",
  },
  (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
  },
);
