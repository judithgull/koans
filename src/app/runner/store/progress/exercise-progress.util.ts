import { Exercise, ExerciseProgress, ModelState } from '../../../model';

/**
 * Create initial exerciseprogress from exercise
 */
export function toInitialProgress(e: Exercise): ExerciseProgress {
  return {
    id: e.sortOrder,
    value: e.exercise,
    solved: false,
    solutionRequested: false,
    solutionVisible: false,
    modelId: '',
    modelVersionId: -1
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
      modelId: modelState.id,
      modelVersionId: modelState.versionId,
      value: modelState.value
    };
  };
}
