import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  api_url = 'https://apisconnect-bmm2.onrender.com/';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Usamos Bearer consistentemente si el servidor lo soporta
    });
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.api_url}api/user/`, {
      headers: this.getHeaders()
    });
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put<any>(`${this.api_url}api/user/`, profileData, {
      headers: this.getHeaders()
    });
  }
}
