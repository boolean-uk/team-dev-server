-- Update existing cohort names that were null
UPDATE "Cohort"
SET "cohortName" = CONCAT('Cohort-', id)
WHERE "cohortName" IS Null;
