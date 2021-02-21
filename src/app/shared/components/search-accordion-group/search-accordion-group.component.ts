import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, OnInit, QueryList } from '@angular/core';
import { SearchAccordionComponent } from '../search-accordion/search-accordion.component';

@Component({
  selector: 'app-accordion-group',
  templateUrl: './search-accordion-group.component.html',
  styleUrls: ['./search-accordion-group.component.scss']
})
export class SearchAccordionGroupComponent implements OnInit, AfterContentInit {
  @ContentChildren(SearchAccordionComponent) accordions: QueryList<SearchAccordionComponent>;

  public current: SearchAccordionComponent = null;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.initMethods();
  }

  private initMethods(): void {
    this.accordions.forEach(accordion => {
      accordion.collapsedChange.subscribe(s => {
        if (this.current === accordion) {
          this.current = null;
          accordion.collapsed = true;
        } else {
          this.current = accordion;
          this.hideAll();
        }
      });
    });
  }

  private hideAll(): void {
    this.accordions.forEach(accordion => {
      if (this.current !== accordion) {
        accordion.collapsed = true;
      }
    });
  }

}
