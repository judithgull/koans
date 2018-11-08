import { EntityState } from '@ngrx/entity';
import { ISeries } from '../../model';

export interface SeriesState extends EntityState<ISeries> {
    selectedSeriesId:string;
    selectedExerciseNr:number;
}
