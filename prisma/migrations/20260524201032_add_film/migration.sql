-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
