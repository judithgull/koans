import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SeriesFacade } from '../store/series/series.facade';

@Injectable({
    providedIn: 'root'
})
export class ExerciseSelectedGuard implements CanActivate {

    constructor(public seriesFacade: SeriesFacade) {
    }

    canActivate(next: ActivatedRouteSnapshot): boolean {
        this.seriesFacade.selectExercise(next.params.exId);
        return true;
    }
}
