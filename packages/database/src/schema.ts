import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const usuariosTable = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  cpf: varchar("cpf", { length: 14 }).notNull().unique(),
  cep: varchar("cep", { length: 9 }).notNull(),
  numero: varchar("numero", { length: 20 }).notNull(),
  complemento: varchar("complemento", { length: 255 }),
  logradouro: varchar("logradouro", { length: 255 }).notNull(),
  bairro: varchar("bairro", { length: 255 }).notNull(),
  localidade: varchar("localidade", { length: 255 }).notNull(),
  uf: varchar("uf", { length: 2 }).notNull(),
  estado: varchar("estado", { length: 100 }).notNull(),
  rua: varchar("rua", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
