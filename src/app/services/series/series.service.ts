import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';

import { ISeries } from '../../model/series';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

export const SERIES_COLLECTION = 'series';
/**
 * Service to store and query series data.
 * Firebase promises only resolves, after execution is completed online.
 * However, this service always completes after successful offline executions.
 **/
@Injectable({ providedIn: 'root' })
export class SeriesService {
  constructor(private afs: AngularFirestore) {}

  getSeries(params?: HttpParams): Observable<ISeries[]> {
    // TODO restrict user
    return this.getAfsCollection().valueChanges();
  }

  get(id: string): Observable<ISeries> {
    return this.afs.doc<ISeries>(`${SERIES_COLLECTION}/${id}`).valueChanges();
  }

  create(series: ISeries): Observable<ISeries> {
    const id = this.afs.createId();
    const s = this.clean(series, id);
    this.getAfsCollection().add(s);
    return of(s);
  }

  update(series: ISeries): Observable<ISeries> {
    const id = series['id'];
    return this.set(series, id);
  }

  private set(series: ISeries, id: string): Observable<ISeries> {
    const s = this.clean(series, id);
    this.getDoc(id).set(s);
    return of(s);
  }

  private clean(series: ISeries, id: string): ISeries {
    const items = series.items.map(i => ({ ...i }));
    return { ...series, items: items, id: id };
  }

  delete(id: string): Observable<any> {
    this.getDoc(id).delete();
    return of(undefined);
  }

  private getDoc(id: string): AngularFirestoreDocument<ISeries> {
    return this.getAfsCollection().doc(id);
  }

  private getAfsCollection(): AngularFirestoreCollection<ISeries> {
    return this.afs.collection<ISeries>(SERIES_COLLECTION);
  }
}
