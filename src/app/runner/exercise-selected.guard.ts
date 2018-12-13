import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { SeriesFacade } from '../store/series/series.facade';
import { EditorModelFacade } from '../store/editor-model/editor-model.facade';
import { filter, tap, take, timeout, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Feedback } from '../model';

@Injectable({
    providedIn: 'root'
})
export class ExerciseSelectedGuard implements CanActivate {

    constructor(public seriesFacade: SeriesFacade, public editorModelFacade: EditorModelFacade) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        this.seriesFacade.selectExercise(next.params.exId);
        return this.checkSelection(next.params.exId).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkSelection(id: string): Observable<Feedback> {
        return this.editorModelFacade
            .selectedProgress$
            .pipe(
                tap(p => {
                    if (!p.validation) {
                        this.editorModelFacade.triggerValidation(p)
                    }
                }
                ),
                filter(p => !!p.validation),
                take(1),
                timeout(1000)
            );
    }
}
