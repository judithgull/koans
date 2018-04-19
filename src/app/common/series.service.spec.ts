import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { mockSeries } from './test/series.mock';
import { SeriesService, URL_SERIES } from './series.service';

describe('SeriesService', () => {
  let httpMock: HttpTestingController;
  let service: SeriesService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeriesService]
    });
    httpMock = bed.get(HttpTestingController);
    service = bed.get(SeriesService);
  });

  it(
    'should be created',
    inject([SeriesService], (service1: SeriesService) => {
      expect(service1).toBeTruthy();
    })
  );

  it('should successfully get a list of test series', done => {
    service.getSeries().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res[0]._id).toBe(1);
      done();
    });

    const request = httpMock.expectOne(URL_SERIES);
    request.flush(mockSeries);

    httpMock.verify();
  });

  it('should return error if series query fails', done => {
    service.getSeries().subscribe(
      // tslint:disable-next-line:no-empty
      () => { },
      err => {
        expect(err).toBe('Unauthorized');
        done();
      }
    );

    const request = httpMock.expectOne(URL_SERIES);
    request.flush({ foo: 'bar' }, { status: 401, statusText: 'Unauthorized' });

    httpMock.verify();
  });

  it('should return a series', done => {
    service.get('1').subscribe(res => {
      expect(res._id).toBe(1);
      done();
    });

    const request = httpMock.expectOne(URL_SERIES + '1');
    request.flush(mockSeries[0]);

    httpMock.verify();
  });

  it('should throw an error, if series not found', done => {
    service.get('').subscribe(
      // tslint:disable-next-line:no-empty
      () => { },
      (e: any) => {
        done();
      }
    );
  });

  it('should update a series', done => {
    service.update(mockSeries[0]).subscribe(res => {
      expect(res._id).toBe(1);
      done();
    });

    const request = httpMock.expectOne(URL_SERIES + '1');
    request.flush(mockSeries[0]);

    httpMock.verify();
  });

  it('should delete a series', done => {
    service.delete('1').subscribe(res => {
      expect(res._id).toBe(1);
      done();
    });

    const request = httpMock.expectOne(URL_SERIES + '1');
    request.flush(mockSeries[0]);

    httpMock.verify();
  });

});

