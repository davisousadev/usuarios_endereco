import { FastifyInstance } from "fastify";
import { usuarioController } from "../controllers/controller.usuario";
import { createUsuarioSchema } from "../schemas/schema.usuario";

export async function usuarioRoutes(app: FastifyInstance) {
  app.post(
    "/usuarios",
    {
      schema: {
        body: createUsuarioSchema,
      },
    },
    usuarioController.createUsuario,
  );

  app.get("/usuarios", usuarioController.getUsuarios);
}
