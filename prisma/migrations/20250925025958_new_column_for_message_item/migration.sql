/*
  Warnings:

  - The primary key for the `chats` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."message_items" DROP CONSTRAINT "message_items_chat_id_fkey";

-- AlterTable
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "chats_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "chats_id_seq";

-- AlterTable
ALTER TABLE "public"."message_items" ADD COLUMN     "latency" TEXT,
ALTER COLUMN "chat_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."message_items" ADD CONSTRAINT "message_items_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
