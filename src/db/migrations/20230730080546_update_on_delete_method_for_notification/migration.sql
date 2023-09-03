-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_notificationId_fkey";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
