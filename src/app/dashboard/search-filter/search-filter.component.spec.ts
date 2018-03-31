import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabItemComponent } from '../tab-item/tab-item.component';
import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SearchFilterComponent, TabItemComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
