import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../../../models/customer';
import { CustomersService } from '../../../services/customers.service';
import { ModalService } from '../detail-customer/modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-detail-customer',
  templateUrl: './dialog-detail-customer.component.html',
  styleUrls: ['./dialog-detail-customer.component.scss']
})
export class DialogDetailCustomerComponent implements OnInit {

  @ViewChild('file') fileInput: any;

  idCustomer: any;
  titleDetail: string = 'Datos del cliente';
  fotoSeleccionadaVacia!: File;
  fotoSeleccionada!: File;
  photo: string = '';
  photoDefault: string = '../../../../assets/user-default.jpeg';
  urlUploads : string = 'http://localhost:8090/api/uploads/img/';
  progreso: number = 0;
  customer: Customer = new Customer;
  visibleSubirFoto: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private customersService: CustomersService,
    public activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: Customer) { }

  ngOnInit(): void {
    this.customer = this.editData;
    this.visibleSubirFoto = false;
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
            setTimeout(()=>{
              this.customer = response.customer as Customer;
              this.snackBar.open((`Imagen subida correctamente: ${this.fotoSeleccionada.name}`), '', {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.visibleSubirFoto = false;
              this.progreso = 0;
              this.fotoSeleccionada = this.fotoSeleccionadaVacia;
              this.fileInput.nativeElement.value = '';
            }, 500);
            this.router.navigate(['/customers']);
          }
        });
      }
  }

  cambiarImagen(): void {
    this.visibleSubirFoto = true;
  }

}
