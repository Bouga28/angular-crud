import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public isLoading: boolean = false;
  headers = { 'Authorization': 'Bearer my-token' }

  constructor(private http: HttpClient) { }

  
  get(): Observable<any>  {
    return this.http.get<User[]>('http://127.0.0.1:8000/api/user');
  }
  create(payload: User) {
    return this.http.post<User>('http://127.0.0.1:8000/api/type', payload);
  }

  update(payload:User){
    return this.http.put(`http://127.0.0.1:8000/api/type/${payload.id}`,payload);
   }

   getById(id: number) {
    return this.http.get<User>(`http://127.0.0.1:8000/api/type/${id}`);
   }

   delete(id:number){
    return this.http.delete<User>(`http://127.0.0.1:8000/api/type/${id}`);
 }
}
