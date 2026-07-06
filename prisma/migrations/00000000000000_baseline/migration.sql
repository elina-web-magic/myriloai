-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChainStep" (
    "id" TEXT NOT NULL,
    "chainId" TEXT NOT NULL,
    "stepOrder" INTEGER NOT NULL,
    "stepName" TEXT NOT NULL,
    "systemPrompt" TEXT,
    "userPrompt" TEXT NOT NULL,
    "maxTokens" INTEGER NOT NULL DEFAULT 4096,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 1.0,

    CONSTRAINT "ChainStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChainStepResult" (
    "id" TEXT NOT NULL,
    "evaluationResultId" TEXT NOT NULL,
    "stepOrder" INTEGER NOT NULL,
    "stepName" TEXT NOT NULL,
    "rawOutput" TEXT NOT NULL,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "executionTimeMs" INTEGER,

    CONSTRAINT "ChainStepResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dataset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Dataset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EvaluationResult" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "rawOutput" TEXT NOT NULL,
    "sanitizedOutput" TEXT,
    "totalScore" INTEGER NOT NULL,
    "scores" JSONB NOT NULL,
    "reasoning" TEXT NOT NULL,

    CONSTRAINT "EvaluationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EvaluationRun" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "categoryId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "promptSnapshot" JSONB NOT NULL,
    "model" TEXT NOT NULL DEFAULT 'claude-sonnet-4',
    "summaryStats" JSONB,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "maxTotalTokens" INTEGER,
    "chainId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvaluationRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EvaluationRunOverride" (
    "runId" TEXT NOT NULL,
    "overrideId" TEXT NOT NULL,

    CONSTRAINT "EvaluationRunOverride_pkey" PRIMARY KEY ("runId","overrideId")
);

-- CreateTable
CREATE TABLE "public"."EvaluatorOverride" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "EvaluatorOverride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PromptChain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "PromptChain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PromptCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "PromptCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PromptSnippet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "PromptSnippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SavedPrompt" (
    "collectionId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,

    CONSTRAINT "SavedPrompt_pkey" PRIMARY KEY ("collectionId","runId")
);

-- CreateTable
CREATE TABLE "public"."Scenario" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "taskDescription" TEXT NOT NULL,
    "promptInputs" JSONB NOT NULL,
    "scoringMetrics" JSONB NOT NULL,
    "datasetId" TEXT NOT NULL,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account"("provider" ASC, "providerAccountId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "public"."Category"("name" ASC);

-- CreateIndex
CREATE INDEX "ChainStep_chainId_idx" ON "public"."ChainStep"("chainId" ASC);

-- CreateIndex
CREATE INDEX "ChainStepResult_evaluationResultId_idx" ON "public"."ChainStepResult"("evaluationResultId" ASC);

-- CreateIndex
CREATE INDEX "EvaluationResult_runId_idx" ON "public"."EvaluationResult"("runId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session"("sessionToken" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "public"."VerificationToken"("identifier" ASC, "token" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "public"."VerificationToken"("token" ASC);

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChainStep" ADD CONSTRAINT "ChainStep_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "public"."PromptChain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChainStepResult" ADD CONSTRAINT "ChainStepResult_evaluationResultId_fkey" FOREIGN KEY ("evaluationResultId") REFERENCES "public"."EvaluationResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dataset" ADD CONSTRAINT "Dataset_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationResult" ADD CONSTRAINT "EvaluationResult_runId_fkey" FOREIGN KEY ("runId") REFERENCES "public"."EvaluationRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationResult" ADD CONSTRAINT "EvaluationResult_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "public"."Scenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationRun" ADD CONSTRAINT "EvaluationRun_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationRun" ADD CONSTRAINT "EvaluationRun_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "public"."PromptChain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationRun" ADD CONSTRAINT "EvaluationRun_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationRunOverride" ADD CONSTRAINT "EvaluationRunOverride_overrideId_fkey" FOREIGN KEY ("overrideId") REFERENCES "public"."EvaluatorOverride"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationRunOverride" ADD CONSTRAINT "EvaluationRunOverride_runId_fkey" FOREIGN KEY ("runId") REFERENCES "public"."EvaluationRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PromptChain" ADD CONSTRAINT "PromptChain_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PromptCollection" ADD CONSTRAINT "PromptCollection_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PromptSnippet" ADD CONSTRAINT "PromptSnippet_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SavedPrompt" ADD CONSTRAINT "SavedPrompt_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."PromptCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SavedPrompt" ADD CONSTRAINT "SavedPrompt_runId_fkey" FOREIGN KEY ("runId") REFERENCES "public"."EvaluationRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Scenario" ADD CONSTRAINT "Scenario_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "public"."Dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

