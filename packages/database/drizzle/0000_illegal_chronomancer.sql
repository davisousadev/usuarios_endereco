CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"cpf" varchar(14) NOT NULL,
	"cep" varchar(9) NOT NULL,
	"numero" varchar(20) NOT NULL,
	"complemento" varchar(255),
	"logradouro" varchar(255) NOT NULL,
	"bairro" varchar(255) NOT NULL,
	"localidade" varchar(255) NOT NULL,
	"uf" varchar(2) NOT NULL,
	"estado" varchar(100) NOT NULL,
	"rua" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_cpf_unique" UNIQUE("cpf")
);
