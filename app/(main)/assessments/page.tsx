import { AssessmentsStats } from "./_components/assessments-stats";
import {
  PendingAssessmentsTable,
  type PendingAssessment,
} from "./_components/pending-assessments-table";
import {
  CompletedAssessmentsTable,
  type CompletedAssessment,
} from "./_components/completed-assessments-table";

//  Mock data
const pendingAssessments: PendingAssessment[] = [
  {
    id: "1",
    name: "Final Exam",
    module: "Application Programming",
    code: "CE203",
    weight: 60,
  },
  {
    id: "2",
    name: "Final Exam",
    module: "Data Structures",
    code: "CE204",
    weight: 50,
  },
  {
    id: "3",
    name: "Final Exam",
    module: "Software Engineering",
    code: "CE205",
    weight: 30,
  },
  {
    id: "4",
    name: "Final Exam",
    module: "Computer Networks",
    code: "CE206",
    weight: 40,
  },
  {
    id: "5",
    name: "Final Exam",
    module: "Database Systems",
    code: "CE207",
    weight: 50,
  },
  {
    id: "6",
    name: "Final Exam",
    module: "Operating Systems",
    code: "CE208",
    weight: 60,
  },
  {
    id: "7",
    name: "Final Exam",
    module: "Artificial Intelligence",
    code: "CE209",
    weight: 50,
  },
];

const completedAssessments: CompletedAssessment[] = [
  {
    id: "1",
    name: "Coursework 1",
    module: "Application Programming",
    code: "CE203",
    weight: 20,
    grade: 72,
  },
  {
    id: "2",
    name: "Quiz",
    module: "Application Programming",
    code: "CE203",
    weight: 20,
    grade: 87.5,
  },
  {
    id: "3",
    name: "Assignment 1",
    module: "Data Structures",
    code: "CE204",
    weight: 25,
    grade: 68,
  },
  {
    id: "4",
    name: "Assignment 2",
    module: "Data Structures",
    code: "CE204",
    weight: 25,
    grade: 74,
  },
  {
    id: "5",
    name: "Group Project",
    module: "Software Engineering",
    code: "CE205",
    weight: 40,
    grade: 78,
  },
  {
    id: "6",
    name: "Individual Report",
    module: "Software Engineering",
    code: "CE205",
    weight: 30,
    grade: 71,
  },
  {
    id: "7",
    name: "Lab Work",
    module: "Computer Networks",
    code: "CE206",
    weight: 30,
    grade: 65,
  },
  {
    id: "8",
    name: "Coursework",
    module: "Computer Networks",
    code: "CE206",
    weight: 30,
    grade: 62,
  },
  {
    id: "9",
    name: "Practical Assessment",
    module: "Database Systems",
    code: "CE207",
    weight: 50,
    grade: 81,
  },
  {
    id: "10",
    name: "Lab Report",
    module: "Operating Systems",
    code: "CE208",
    weight: 40,
    grade: 58,
  },
  {
    id: "11",
    name: "Project",
    module: "Artificial Intelligence",
    code: "CE209",
    weight: 50,
    grade: 85,
  },
  {
    id: "12",
    name: "Website Project",
    module: "Web Development",
    code: "CE210",
    weight: 60,
    grade: 92,
  },
  {
    id: "13",
    name: "Presentation",
    module: "Web Development",
    code: "CE210",
    weight: 40,
    grade: 88,
  },
];

export default function AssessmentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Assessments</h1>
        <p className="text-muted-foreground mt-1">
          View all your assessments across modules
        </p>
      </div>

      <AssessmentsStats
        total={pendingAssessments.length + completedAssessments.length}
        completed={completedAssessments.length}
        pending={pendingAssessments.length}
      />

      <PendingAssessmentsTable assessments={pendingAssessments} />

      <CompletedAssessmentsTable assessments={completedAssessments} />
    </div>
  );
}
