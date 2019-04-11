import { IExercise } from './exercise';

export interface ISeries {
  id?: string;
  title: string;
  programmingLanguage: string;
  authorId: string;
  items: IExercise[];
}
