import { Exercise, ExerciseProgress, ModelState } from '../../../model';
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

export function solve(
  userSolution
): (previousProgress: ExerciseProgress) => ExerciseProgress {
  return (previousProgress: ExerciseProgress) => {
    return {
      ...previousProgress,
      userSolution: userSolution,
      solved: !previousProgress.solutionRequested
    };
  };
}

export function toggleSolutionVisible(
  previousProgress: ExerciseProgress
): ExerciseProgress {
  return {
    ...previousProgress,
    solutionRequested: !previousProgress.solved,
    solutionVisible: !previousProgress.solutionVisible
  };
}

export function addModelState(
  modelState: ModelState
): (previousProgress: ExerciseProgress) => ExerciseProgress {
  return (previousProgress: ExerciseProgress) => {
    return {
      ...previousProgress,
      modelState
    };
  };
}
