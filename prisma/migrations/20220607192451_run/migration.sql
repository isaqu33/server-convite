-- CreateTable
CREATE TABLE "convidados" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "convidados_nome_key" ON "convidados"("nome");
