import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  api_url = 'https://apisconnect-bmm2.onrender.com/';

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
  }

  getUser() {
    return this.http.get<any>(this.api_url + 'api/user/', {
      headers: this.getHeaders(),
    });
  }

  updateProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found!');
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.put<any>(this.api_url + 'api/user/', profileData, { headers });
  }
}
