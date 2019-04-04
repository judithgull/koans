import { TestBed } from '@angular/core/testing';
import { SeriesService, SERIES_COLLECTION } from './series.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { ISeries } from '../../model';
import { mockSeries } from '../../common/test';
import { Subscription, of } from 'rxjs';

describe('SeriesService', () => {
  let service: SeriesService;
  const subs = new Subscription();
  let fireStore: AngularFirestore;
  let collectionSpy: AngularFirestoreCollection;
  let docSpy: AngularFirestoreDocument<ISeries>;
  const testId = '1';

  beforeEach(async () => {
    docSpy = jasmine.createSpyObj('doc', {
      set: '',
      delete: '',
      valueChanges: of(mockSeries[0])
    });
    collectionSpy = jasmine.createSpyObj('collection', {
      add: '',
      doc: docSpy,
      valueChanges: of(mockSeries)
    });
    fireStore = jasmine.createSpyObj('AngularFirestore', {
      createId: testId,
      collection: collectionSpy,
      doc: docSpy
    });
    const bed = TestBed.configureTestingModule({
      imports: [],
      providers: [
        SeriesService,
        { provide: AngularFirestore, useValue: fireStore }
      ]
    });
    service = bed.get(SeriesService);
  });

  afterEach(() => {
    subs.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a series', (done: () => void) => {
    const testSeries: ISeries = mockSeries[0];

    subs.add(
      service.create(testSeries).subscribe(s => {
        expect(s.id).toEqual(testId);
        expect(s.title).toEqual(testSeries.title);
        expect(s.items.length).toEqual(testSeries.items.length);
        expect(fireStore.collection).toHaveBeenCalledWith(SERIES_COLLECTION);
        expect(collectionSpy.add).toHaveBeenCalledWith(
          jasmine.objectContaining({ title: testSeries.title, id: testId })
        );
        done();
      })
    );
  });

  it('should get all series from db', (done: () => void) => {
    const testSeries: ISeries = mockSeries[0];

    subs.add(
      service.getSeries().subscribe(series => {
        expect(series.length).toEqual(2);
        expect(series[0].title).toEqual(testSeries.title);
        expect(series[0].items.length).toEqual(testSeries.items.length);
        done();
      })
    );
  });

  it('should get a series from db', (done: () => void) => {
    const testSeries: ISeries = mockSeries[0];

    subs.add(
      service.get(testId).subscribe(series => {
        expect(series.title).toEqual(testSeries.title);
        expect(series.items.length).toEqual(testSeries.items.length);
        done();
      })
    );
  });

  it('should update a series', (done: () => void) => {
    const testSeries: ISeries = mockSeries[0];
    subs.add(
      service.update({ ...testSeries, title: 'newTitle' }).subscribe(s => {
        expect(s.title).toEqual('newTitle');
        expect(collectionSpy.doc).toHaveBeenCalledWith(testSeries.id);
        expect(docSpy.set).toHaveBeenCalledWith(
          jasmine.objectContaining({ title: 'newTitle' })
        );
        done();
      })
    );
  });

  it('should delete a series', (done: () => void) => {
    const testSeries: ISeries = mockSeries[0];
    subs.add(
      service.delete(testId).subscribe(_ => {
        expect(collectionSpy.doc).toHaveBeenCalledWith(testSeries.id);
        expect(docSpy.delete).toHaveBeenCalled();
        done();
      })
    );
  });
});
