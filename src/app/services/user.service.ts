import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  api_url = 'https://apisconnect-bmm2.onrender.com/';

  constructor(private http: HttpClient) {}

  // Método centralizado para crear headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.api_url + 'api/user/', {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put<any>(this.api_url + 'api/user/', profileData, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Manejo de errores
  private handleError(error: any) {
    let errorMessage = 'An error occurred: ' + error.message;
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}