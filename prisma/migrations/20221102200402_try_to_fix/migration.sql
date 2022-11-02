/*
  Warnings:

  - You are about to drop the `Joke` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Joke";

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "joke" TEXT NOT NULL,
    "test" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
