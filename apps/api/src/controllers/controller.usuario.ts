import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUsuarioInput } from "../schemas/schema.usuario";
import { db, usuariosTable } from "@usuarios_endereco/model";
import { getCEP } from "../helpers/getCep";

export const usuarioController = {
  async createUsuario(
    req: FastifyRequest<{
      Body: CreateUsuarioInput;
    }>,
    res: FastifyReply,
  ) {
    try {
      const { nome, cpf, cep, numero, complemento } = req.body;

      const dataCEP = await getCEP(cep);

      const { logradouro, bairro, localidade, uf, estado } = dataCEP;

      res.log.info({ dataCEP }, "Dados do CEP obtidos com sucesso");

      await db.insert(usuariosTable).values({
        nome,
        cpf,
        cep,
        numero,
        complemento,
        logradouro,
        bairro,
        localidade,
        uf,
        estado,
        rua: logradouro,
      });

      res.status(201).send({ message: "Usuário criado com sucesso" });
    } catch (error) {
      res.status(500).send({ error: "Erro ao criar usuário" });
    }
  },

  async getUsuarios(_req: FastifyRequest, res: FastifyReply) {
    try {
      const usuarios = await db.select().from(usuariosTable);

      res.status(200).send(usuarios);
    } catch (error) {
      res.status(500).send({ error: "Erro ao buscar usuários" });
    }
  },
};
