-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "author" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nip" INTEGER NOT NULL,
    "regon" INTEGER,
    "pkd" TEXT,
    "postalCode" TEXT,
    "city" TEXT,
    "street" TEXT,
    "phoneNumber" INTEGER,
    "email" TEXT,
    "notes" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "author" INTEGER NOT NULL,
    "secondName" TEXT,
    "sex" TEXT,
    "trainingEntry" TIMESTAMP(3),
    "trainingPeriodic" TIMESTAMP(3),
    "medicalExamination" TIMESTAMP(3),
    "companyId" INTEGER NOT NULL,
    "department" TEXT,
    "employmentForm" TEXT,
    "absence" TEXT,
    "pesel" INTEGER,
    "IdCardNumber" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "placeOfBirth" TEXT,
    "disability" BOOLEAN,
    "postalCode" TEXT,
    "city" TEXT,
    "street" TEXT,
    "phoneNumber" INTEGER,
    "email" TEXT,
    "position" TEXT,
    "positionType" TEXT,
    "positionSection" TEXT,
    "positionNotes" TEXT,
    "youth" BOOLEAN,
    "nightShift" BOOLEAN,
    "notes" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "author" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyDepartment" INTEGER NOT NULL,
    "companyNip" INTEGER NOT NULL,
    "companyPkd" TEXT,
    "companyPostalCode" TEXT,
    "companyCity" TEXT,
    "companyStreet" TEXT,
    "trainingType" TEXT NOT NULL,
    "trainingForm" TEXT NOT NULL,
    "trainingDate" TIMESTAMP(3) NOT NULL,
    "trainingValidity" TIMESTAMP(3) NOT NULL,
    "program" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_companyId_key" ON "Worker"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Training_companyId_key" ON "Training"("companyId");
