export class ExerciseKey {

  constructor(
    public seriesId: string,
    public exerciseId: number
  ) { }

  get uuid() {
    return this.seriesId + '/' + this.exerciseId
  }

  get exercisePath() {
    return this.uuid + '/exercise'
  };

  get solutionPath() {
    return this.uuid + '/solution'
  };


  static from(path: string) {
    if (!path) {
      return null;
    }
    const fragments = path.split('/');
    if (fragments.length !== 3) {
      return null;
    }
    const seriesId = fragments[0];
    const exerciseId = parseInt(fragments[1], 10);
    if (isNaN(exerciseId)) {
      return null;
    }
    return new ExerciseKey(seriesId, exerciseId);
  }

}
