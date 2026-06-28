-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "regon" TEXT,
    "pkd" TEXT NOT NULL,
    "postalCode" TEXT,
    "city" TEXT,
    "street" TEXT,
    "phoneNumber" INTEGER,
    "email" TEXT,
    "notes" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Worker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "author" INTEGER NOT NULL,
    "companyId" INTEGER,
    "secondName" TEXT,
    "sex" TEXT,
    "trainingEntry" DATETIME,
    "trainingPeriodic" DATETIME,
    "medicalExamination" DATETIME,
    "department" TEXT,
    "employmentForm" TEXT,
    "absence" TEXT,
    "pesel" INTEGER,
    "IdCardNumber" TEXT,
    "dateOfBirth" DATETIME,
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
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Worker_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Training" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "trainingDate" DATETIME NOT NULL,
    "trainingValidity" DATETIME NOT NULL,
    "program" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Training_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Training_companyId_key" ON "Training"("companyId");
