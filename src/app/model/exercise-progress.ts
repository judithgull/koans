import { ModelState } from './feedback';

export interface ExerciseProgress {
  id: number;
  value: string;
  solved: boolean;
  solutionRequested: boolean;
  solutionVisible: boolean;
}
