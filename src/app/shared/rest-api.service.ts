import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, pipe, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  getEmployees() {
    return this.http.get(this.apiURL).pipe(
      retry(1),
      catchError(this.handleError)
    );
    }

  createEmployee(employee) {
            let body = JSON.stringify(employee);
           return this.http.post(this.apiURL, body).pipe(
            retry(1),
            catchError(this.handleError)
          );
        }
  getEmployee(id){
    return this.http.get(this.apiURL+'id').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }  

  updateEmployee(id, employee){
    let body = JSON.stringify(employee)
       return this.http.patch(this.apiURL + id, body).pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  deleteEmployee(id){
    return this.http.delete(this.apiURL +id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}