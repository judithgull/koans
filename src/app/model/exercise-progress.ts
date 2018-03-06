import { ModelState } from './feedback';

export interface ExerciseProgress {
  id: number;
  userSolution: string;
  modelState?: ModelState;
  solved: boolean;
  solutionRequested: boolean;
  solutionVisible: boolean;
}