export class Exercise {
  _id: number;
  sortOrder: number;
  title: string;
  description: string;
  exercise: string;
  solution: string;
}

export interface ExerciseUserProgress {
  id: number;
  userSolution: string;
  solved: boolean;
  solutionRequested: boolean;
  solutionVisible: boolean;
}
