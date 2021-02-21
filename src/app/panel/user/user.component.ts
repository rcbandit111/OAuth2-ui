import {Component} from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <div class="element-wrapper">
      <router-outlet></router-outlet>
    </div>
  `
})
export class UserComponent {
}
