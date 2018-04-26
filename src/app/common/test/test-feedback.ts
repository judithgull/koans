import { ProgrammingLanguage, Feedback } from '../../model';
import { testModelState } from './test-model-state';

export const testFeedback: Feedback = {
  ...testModelState,
  solutionRequested: false,
  solutionVisible: false,
  valid: false,
};
