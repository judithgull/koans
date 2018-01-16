import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesIconComponent } from './series-icon.component';

describe('SeriesIconComponent', () => {
  let component: SeriesIconComponent;
  let fixture: ComponentFixture<SeriesIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
