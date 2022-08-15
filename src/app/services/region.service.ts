import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private urlRegions : string = 'http://localhost:8090/api/regions';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

    getRegions(): Observable<Region[]>{
      return this.httpClient.get<Region[]>(this.urlRegions);
    }

    getRegion(idRegion: number): Observable<Region>{
      return this.httpClient.get<Region>(`${this.urlRegions}/${idRegion}`)
      .pipe(catchError((e:any) => {
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
}
