/*
  Warnings:

  - You are about to drop the column `content` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `reply` on the `messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."messages" DROP COLUMN "content",
DROP COLUMN "createdAt",
DROP COLUMN "reply",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."message_items" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "message_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."message_items" ADD CONSTRAINT "message_items_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
