import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../models/customer';
import { CustomersService } from '../../../services/customers.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConfirmationMessageComponent } from '../../shared/confirmation-message/confirmation-message.component';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent implements OnInit {

  idCustomer: any;
  customerForm!: FormGroup;
  titleCreate: string = 'Registra un nuevo cliente';
  titleUpdate: string = 'Modifica datos del cliente';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  customer: Customer = new Customer();

  constructor(private customersService: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
    const idParam = 'idCustomer';
    this.idCustomer = this.activatedRoute.snapshot.params[idParam];
    this.getCustomer();

  }

  getCustomer(): void {
    if (this.idCustomer) {
      this.customersService.getCustomer(this.idCustomer).subscribe((data) => {
        this.customer = data;

        this.customerForm.patchValue({
          firstName: this.customer.firstname,
          lastName: this.customer.lastname,
          email: this.customer.email,
          dateOfBirth: this.customer.dateOfBirth
        });
      });
    }
  }

  saveCustomer(): void {
    if (this.idCustomer !== undefined) {
      this.updateCustomer();
    } else {
      this.createCustomer();
    }
  }

  createCustomer(): void {
    this.customer.firstname = this.customerForm.get('firstName')?.value;
    this.customer.lastname = this.customerForm.get('lastName')?.value;
    this.customer.email = this.customerForm.get('email')?.value;
    this.customer.dateOfBirth = this.customerForm.get('dateOfBirth')?.value;

    this.customersService.createCustomer(this.customer)
    .subscribe(
      {
        next: () => {
          this.snackBar.open('Cliente registrado con exito!', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['/customers'])
        },
        error: err => {
          let messageError = '';
          if (err.error.message === undefined){
            messageError = JSON.stringify(err.error).replace('{', '').replace('}', '').replace(',','  &&  ');
          } else {
            messageError = err.error.message;
          }
          this.snackBar.open(messageError, '', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    );
  }

  updateCustomer(): void {
    this.customer.firstname = this.customerForm.get('firstName')?.value;
    this.customer.lastname = this.customerForm.get('lastName')?.value;
    this.customer.email = this.customerForm.get('email')?.value;
    this.customer.dateOfBirth = this.customerForm.get('dateOfBirth')?.value;

    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: '350px',
      data: { message: 'Esta seguro que desea actualizar el cliente?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Aceptar') {
        this.customersService.updateCustomer(this.customer)
        .subscribe(
        {
            next: () => {
              this.snackBar.open('Cliente actualizado con exito!', '', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.router.navigate(['/customers']);
          },
          error: err => {
            let messageError = '';
            if (err.error.message === undefined){
              messageError = JSON.stringify(err.error).replace('{', '').replace('}', '').replace(',','  &&  ');
            } else {
              messageError = err.error.message;
            }
            this.snackBar.open(messageError, '', {
              duration: 6000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        });
      }
    });
  }

}

