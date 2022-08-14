import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer';
import { ConfirmationMessageComponent } from '../shared/confirmation-message/confirmation-message.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { DialogDetailCustomerComponent } from './dialog-detail-customer/dialog-detail-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'photo', 'firstname', 'email', 'dateOfBirth', 'acciones'];
  dataSource = new MatTableDataSource<Customer>();

  customers: Customer[] = [];
  selectedCustomer!: Customer;
  pageActual: number = 0;
  cantidadRegistrosAMostrar: number = 5;
  cantidadTotalRegistros: number = 0;
  photoDefault: string = '../../../../assets/user-default.jpeg';
  urlUploads : string = 'http://localhost:8090/api/uploads/img/';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private customersService: CustomersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getAllCustomers(this.pageActual, this.cantidadRegistrosAMostrar);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllCustomers(page: number, pageSize: number): void{
    this.customersService.getCustomers(page, pageSize).subscribe(
      (data) => {
        this.customers = data.content;
        this.cantidadTotalRegistros = data.totalElements;
        this.dataSource = new MatTableDataSource(this.customers);
      });
  }

  actualizarPaginacion(event: PageEvent) {
    this.pageActual = event.pageIndex;
    this.cantidadRegistrosAMostrar = event.pageSize;
    this.getAllCustomers(this.pageActual, this.cantidadRegistrosAMostrar);
  }

  delete(customerId: number){
    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: '350px',
      data: {message: '¿Esta seguro que desea eliminar el cliente?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Aceptar') {
        this.customersService.deleteCustomer(customerId).subscribe(
          () => { this.getAllCustomers(this.pageActual, this.cantidadRegistrosAMostrar); }
        );
        this.snackBar.open('El cliente fue eliminado con exito!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  openDialog(element: Customer) {
    this.dialog.open(DialogDetailCustomerComponent, {
      //height: '100px',
      width: '500px',
      data: element,
    }).afterClosed().subscribe(val => {
      if (val === 'close') {
        this.getAllCustomers(this.pageActual, this.cantidadRegistrosAMostrar);
      }
    });
  }

}
