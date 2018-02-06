import { Exercise, ExerciseProgress } from '../../../common/model';
/**
 * Create initial exerciseprogress from exercise
 */
export function toInitialProgress(e: Exercise): ExerciseProgress {
  return {
    id: e.sortOrder,
    userSolution: e.exercise,
    solved: false,
    solutionRequested: false,
    solutionVisible: false
  };
}
