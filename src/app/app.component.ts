import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-app';
  opened = true;

  getMessage(e:boolean) {
    this.opened = e;
  }
}
