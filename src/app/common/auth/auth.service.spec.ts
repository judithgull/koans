import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';


class MockHttpClient {
  post(url: string, body: any | null): Observable<Object> {
    return null;
  }
}

function createResponse(body) {
  Observable.of(new Response(JSON.stringify(body)));
}

describe('AuthService', () => {

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [AuthService,
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
