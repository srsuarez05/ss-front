import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  opened = true;
  messageBotonMenu: string = 'Ocultar el menú';
  @Output() toggleSidevar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  ejecutarSidevar() {
    this.opened = this.opened =! this.opened;
    this.toggleSidevar.emit(this.opened);
    if (this.opened === false){
      this.messageBotonMenu = 'Mostrar el menú';
    } else {
      this.messageBotonMenu = 'Ocultar el menú';
    }
  }

}
