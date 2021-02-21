import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toUpperCase();
    return items.filter( it => {
      if (it.id === null) {
        return true;
      } else {
        return it.label.toUpperCase().includes(searchText);
      }
    });
  }

}
