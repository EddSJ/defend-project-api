-- CreateTable
CREATE TABLE "_TemplateLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TemplateLikes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TemplateLikes_B_index" ON "_TemplateLikes"("B");

-- AddForeignKey
ALTER TABLE "_TemplateLikes" ADD CONSTRAINT "_TemplateLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TemplateLikes" ADD CONSTRAINT "_TemplateLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
