import { z } from "zod";

export const usuarioSchema = z.object({
  id: z
    .number()
    .int()
    .positive({ message: "ID deve ser um número inteiro positivo" }),
  nome: z
    .string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(255, { message: "Nome deve ter no máximo 255 caracteres" }),
  cpf: z
    .string()
    .trim()
    .min(11, { message: "CPF deve ter no mínimo 11 caracteres" })
    .max(14, { message: "CPF deve ter no máximo 14 caracteres" }),
  cep: z
    .string()
    .trim()
    .min(8, { message: "CEP deve ter no mínimo 8 caracteres" })
    .max(9, { message: "CEP deve ter no máximo 9 caracteres" }),
  numero: z
    .string()
    .trim()
    .min(1, { message: "Número é obrigatório" })
    .max(20, { message: "Número deve ter no máximo 20 caracteres" }),
  complemento: z
    .string()
    .trim()
    .max(255, { message: "Complemento deve ter no máximo 255 caracteres" })
    .nullable()
    .optional(),
  logradouro: z
    .string()
    .trim()
    .min(1, { message: "Logradouro é obrigatório" })
    .max(255, { message: "Logradouro deve ter no máximo 255 caracteres" })
    .optional(),
  bairro: z
    .string()
    .trim()
    .min(1, { message: "Bairro é obrigatório" })
    .max(255, { message: "Bairro deve ter no máximo 255 caracteres" })
    .optional(),
  localidade: z
    .string()
    .trim()
    .min(1, { message: "Localidade é obrigatória" })
    .max(255, { message: "Localidade deve ter no máximo 255 caracteres" })
    .optional(),
  uf: z
    .string()
    .trim()
    .length(2, { message: "UF deve ter exatamente 2 caracteres" })
    .optional(),
  estado: z
    .string()
    .trim()
    .min(1, { message: "Estado é obrigatório" })
    .max(100, { message: "Estado deve ter no máximo 100 caracteres" })
    .optional(),
  rua: z
    .string()
    .trim()
    .min(1, { message: "Rua é obrigatória" })
    .max(255, { message: "Rua deve ter no máximo 255 caracteres" })
    .optional(),
  createdAt: z.date(),
});

export const createUsuarioSchema = usuarioSchema.omit({
  id: true,
  createdAt: true,
});

export const usuarioParamsSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive({ message: "ID deve ser um número inteiro positivo" }),
});

export type Usuario = z.infer<typeof usuarioSchema>;
export type CreateUsuarioInput = z.infer<typeof createUsuarioSchema>;
export type UsuarioParams = z.infer<typeof usuarioParamsSchema>;
