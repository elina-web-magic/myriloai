-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable: add Category.projectId as nullable first (8 existing rows), backfill, then enforce NOT NULL.
ALTER TABLE "Category" ADD COLUMN "projectId" TEXT;

-- Backfill: at migration time there is exactly one Project in this database,
-- so every existing Category is assigned to it. Revisit this backfill if the
-- database ever has more than one Project before this migration runs.
UPDATE "Category" SET "projectId" = (SELECT "id" FROM "Project" LIMIT 1) WHERE "projectId" IS NULL;

ALTER TABLE "Category" ALTER COLUMN "projectId" SET NOT NULL;

-- AlterTable (EvaluatorOverride, EvaluationRun, EvaluationResult are empty tables — safe to add NOT NULL directly)
ALTER TABLE "EvaluatorOverride" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EvaluationRun" ADD COLUMN     "judgeModel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EvaluationResult" ADD COLUMN     "rubricSnapshot" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_projectId_name_key" ON "Category"("projectId", "name");

-- CreateIndex
CREATE INDEX "EvaluatorOverride_projectId_idx" ON "EvaluatorOverride"("projectId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatorOverride" ADD CONSTRAINT "EvaluatorOverride_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
