import { ExerciseKey } from './exercise-key';


describe('fromPath', () => {
  it('should return null for an invalid path', () => {
    expect(ExerciseKey.from('')).toBe(null);
    expect(ExerciseKey.from(undefined)).toBe(null);
    expect(ExerciseKey.from('a/b')).toBe(null);
    expect(ExerciseKey.from('//exercise')).toBe(null);
  });

  it('should return a valid key for a valid path', () => {
    expect(ExerciseKey.from('123/3/exercise')).toEqual(new ExerciseKey('123', 3));
  });
});
