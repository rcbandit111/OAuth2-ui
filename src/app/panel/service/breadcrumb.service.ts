import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  _items = [];

  get items() {
    return this._items || [];
  }

  setItems(items: any[]) {
    this._items = items;
  }

}
