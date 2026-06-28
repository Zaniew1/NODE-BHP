-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "regon" TEXT,
    "pkd" TEXT,
    "postalCode" TEXT,
    "city" TEXT,
    "street" TEXT,
    "phoneNumber" INTEGER,
    "email" TEXT,
    "notes" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Company" ("author", "city", "createdAt", "email", "id", "name", "nip", "notes", "phoneNumber", "pkd", "postalCode", "regon", "street", "updatedAt") SELECT "author", "city", "createdAt", "email", "id", "name", "nip", "notes", "phoneNumber", "pkd", "postalCode", "regon", "street", "updatedAt" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE TABLE "new_Worker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "author" INTEGER,
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
INSERT INTO "new_Worker" ("IdCardNumber", "absence", "author", "city", "companyId", "createdAt", "dateOfBirth", "department", "disability", "email", "employmentForm", "id", "medicalExamination", "name", "nightShift", "notes", "pesel", "phoneNumber", "placeOfBirth", "position", "positionNotes", "positionSection", "positionType", "postalCode", "secondName", "sex", "street", "surname", "trainingEntry", "trainingPeriodic", "updatedAt", "youth") SELECT "IdCardNumber", "absence", "author", "city", "companyId", "createdAt", "dateOfBirth", "department", "disability", "email", "employmentForm", "id", "medicalExamination", "name", "nightShift", "notes", "pesel", "phoneNumber", "placeOfBirth", "position", "positionNotes", "positionSection", "positionType", "postalCode", "secondName", "sex", "street", "surname", "trainingEntry", "trainingPeriodic", "updatedAt", "youth" FROM "Worker";
DROP TABLE "Worker";
ALTER TABLE "new_Worker" RENAME TO "Worker";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
