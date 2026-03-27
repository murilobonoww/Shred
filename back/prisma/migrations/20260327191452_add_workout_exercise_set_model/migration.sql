/*
  Warnings:

  - You are about to drop the column `failed` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `restTime` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `rir` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `WorkoutExercise` table. All the data in the column will be lost.
  - Added the required column `exerciseName` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_exerciseId_fkey";

-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "failed",
DROP COLUMN "reps",
DROP COLUMN "restTime",
DROP COLUMN "rir",
DROP COLUMN "weight",
ADD COLUMN     "exerciseName" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ALTER COLUMN "exerciseId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "WorkoutExerciseSet" (
    "id" SERIAL NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "rir" INTEGER,
    "failed" BOOLEAN NOT NULL DEFAULT false,
    "restTime" INTEGER,
    "order" INTEGER NOT NULL,
    "workoutExerciseId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutExerciseSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseSet" ADD CONSTRAINT "WorkoutExerciseSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
