import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { CustomersPage } from '../models/customersPage';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private urlCustomers : string = 'http://localhost:8090/api/customers';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  getCustomers(page: number, pageSize: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.httpClient.get<CustomersPage[]>(this.urlCustomers, {params});
  }

  getCustomer(idCustomer: number): Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.urlCustomers}/${idCustomer}`)
    .pipe(catchError((e) => {
      this.snackBar.open(e.error.message, '', {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.router.navigate(['/customers']);
      return throwError(() => new Error(e.error.message));
    }),
    )
  }

  createCustomer(customer: Customer) : Observable<Customer> {
    return this.httpClient.post<Customer>(this.urlCustomers, customer, {headers: this.httpHeaders})
  }

  updateCustomer(customer: Customer): Observable<Customer>{
    return this.httpClient.put<Customer>(`${this.urlCustomers}/${customer.id}`, customer, {headers: this.httpHeaders})
  }

  deleteCustomer(idCustomer: number): Observable<Customer>{
    return this.httpClient.delete<Customer>(`${this.urlCustomers}/${idCustomer}`, {headers: this.httpHeaders})
  }


  subirFoto(fileImage: File, idCustomer:any): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("fileImage", fileImage);
    formData.append("idCustomer", idCustomer);

    const req = new HttpRequest('POST', `${this.urlCustomers}/upload-image`, formData, {
      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  /*
  subirFoto(fileImage: File, idCustomer:any): Observable<any> {
    let formData = new FormData();
    formData.append("fileImage", fileImage);
    formData.append("idCustomer", idCustomer);

    return this.httpClient.post(`${this.urlCustomers}/upload-image`, formData)
  }
  */

}
