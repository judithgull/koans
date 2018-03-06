import { ModelState } from './feedback';

export interface ExerciseProgress {
  id: number;
  value: string;
  modelId: string;
  modelVersionId: number;
  solved: boolean;
  solutionRequested: boolean;
  solutionVisible: boolean;
}
