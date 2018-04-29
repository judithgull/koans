import { ModelState } from './feedback';

export interface ExerciseProgress {
  solved: boolean;
  valid: boolean;
  solutionRequested: boolean;
  solutionVisible: boolean;
}
