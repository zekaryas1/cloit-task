-- CreateTable
CREATE TABLE "Menu" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" UUID,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
