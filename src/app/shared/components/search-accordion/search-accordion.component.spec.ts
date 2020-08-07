import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAccordionComponent } from './search-accordion.component';

describe('SearchAccordionComponent', () => {
  let component: SearchAccordionComponent;
  let fixture: ComponentFixture<SearchAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
