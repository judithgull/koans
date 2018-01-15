export class ExerciseInfo {
  _id: number;
  sortOrder: number;
  title: string;
  description: string;
  exercise: string;
  solution: string;

  userSolution?: string;
  solutionRequested = false;

  constructor(
    e: Exercise,
    public programmingLanguage: string,
    public hasPrevious: boolean,
    public hasNext: boolean
  ) {
    this._id = e._id;
    this.sortOrder = e.sortOrder;
    this.title = e.title;
    this.description = e.description;
    this.exercise = e.exercise;
    this.solution = e.solution;
  }
}

export class Exercise {
  _id: number;
  sortOrder: number;
  title: string;
  description: string;
  exercise: string;
  userSolution?: string;
  solution: string;
  solutionRequested?: boolean;
}

export interface ExerciseUserProgress {
  id: number;
  userSolution: string;
  solved: boolean;
  solutionRequested: boolean;
}
