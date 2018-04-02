import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { JsLibsService, JS_LIB_URL } from './js-libs.service';

describe('JsLibsService', () => {
  let httpMock: HttpTestingController;
  let service: JsLibsService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JsLibsService]
    });
    httpMock = bed.get(HttpTestingController);
    service = bed.get(JsLibsService);
  });

  it(
    'should be created',
    inject([JsLibsService], (service1: JsLibsService) => {
      expect(service1).toBeTruthy();
    })
  );

  it('should successfully get a js library', done => {
    const libContent = 'asdf';
    const libName = 'libName';
    service.get(libName).subscribe(res => {
      expect(res).toBe(libContent);
      done();
    });

    const request = httpMock.expectOne(JS_LIB_URL + libName);
    request.flush(libContent);

    httpMock.verify();
  });
});
