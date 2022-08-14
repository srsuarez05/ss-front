import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { Customer } from '../../../models/customer';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent implements OnInit {

  @ViewChild('file') fileInput: any;
  @Input() customer: Customer = new Customer;
  //customer: Customer = new Customer;

  idCustomer: any;
  titleDetail: string = 'Datos del cliente';
  fotoSeleccionadaVacia!: File;
  fotoSeleccionada!: File;
  photo: string = '';
  photoDefault: string = '../../../../assets/user-default.jpeg';
  urlUploads : string = 'http://localhost:8090/api/uploads/img/';
  progreso: number = 0;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private customersService: CustomersService,
    public modalService: ModalService,
    private router: Router,
    private snackBar: MatSnackBar) { }

    ngOnInit(): void {
      /*
      this.activatedRoute.paramMap.subscribe(params => {
        this.idCustomer = params.get('idCustomer');
        if (this.idCustomer) {
          this.getCustomer();
        }
      });
      */
  }

  getCustomer(): void {
    this.customersService.getCustomer(this.idCustomer).subscribe((data) => {
      this.customer = data;
      this.photo = this.urlUploads+this.customer.photo;
      this.progreso = 0;
    });
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      this.snackBar.open(('Error seleccionar imagen: El archivo debe ser del tipo imagen'), '', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.fileInput.nativeElement.value = '';
      this.fotoSeleccionada = this.fotoSeleccionadaVacia;
    }
  }

  subirFoto() {
      if (!this.fotoSeleccionada) {
        this.snackBar.open(('Error: Debe seleccionar una foto'), '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router.navigate(['/customers']);
      } else {
        this.customersService.subirFoto(this.fotoSeleccionada, this.customer.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total!) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.customer = response.customer as Customer;

            setTimeout(()=>{
              this.snackBar.open((`Imagen subida correctamente: ${this.fotoSeleccionada.name}`), '', {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.progreso = 0;
            }, 500);
          }
        });
        //this.progreso = 0;
        this.fileInput.nativeElement.value = '';
        this.router.navigate(['/customers']);
      }
  }

  closeModal() {
    this.fotoSeleccionada = this.fotoSeleccionadaVacia;
    this.progreso = 0;
    this.modalService.closeModal();
  }

}
