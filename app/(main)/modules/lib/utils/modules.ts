import { Module } from "@/lib/data/modules";
import { StudentModules } from "@/lib/data/student-modules";

export function getSwapCandidates(
  currYearModules: Module[],
  studentModules: StudentModules,
) {
  // list of modules to not return
  const studentEnrolledModuleIds = studentModules.map(
    (module) => module.module_id,
  );

  const swapCandidates = currYearModules
    .filter(
      (currYearModule) => !studentEnrolledModuleIds.includes(currYearModule.id),
    )
    .map((currYearModule) => ({
      id: currYearModule.id,
      code: currYearModule.code,
      name: currYearModule.name,
      credits: currYearModule.credits,
    }));

  return swapCandidates;
}
