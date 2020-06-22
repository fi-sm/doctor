import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _httpClient: HttpClient,
    private authService: AuthService) {
  }

  getUsers(page: number) : Observable<Users> {
    return this._httpClient.get<Users>('http://localhost:8877/patient/api/v1/' + page+'/10', this.getRequestHeader());
  }

  addUser(params) {
    return this._httpClient.post('http://localhost:8877/patient/api/v1', params, this.getRequestHeader());
  }

  deleteUser(id, action) {
    return this._httpClient.delete('http://localhost:8877/patient/api/v1/'+ id, this.getRequestHeader());
  }

  updateUser(params) {
    return this._httpClient.post('http://localhost:8877/patient/api/v1', params, this.getRequestHeader());
  }

  getRequestHeader(){
    let reqHeaders: HttpHeaders = new HttpHeaders();
    reqHeaders = reqHeaders.append('idToken', this.authService.getToken());
    return { headers: reqHeaders};
  }
}
