/*
  Warnings:

  - You are about to drop the column `message_id` on the `message_items` table. All the data in the column will be lost.
  - Added the required column `chat_id` to the `message_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."message_items" DROP CONSTRAINT "message_items_message_id_fkey";

-- AlterTable
ALTER TABLE "public"."message_items" DROP COLUMN "message_id",
ADD COLUMN     "chat_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."message_items" ADD CONSTRAINT "message_items_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
