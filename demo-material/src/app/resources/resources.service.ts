import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from './resource';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  public isLoading: boolean = false;
  constructor(private http: HttpClient) { }

  get() {
    console.log("GET RESOURCES ...... ");
    return this.http.get<Resource[]>('http://127.0.0.1:8000/api/resource');
  }
  create(payload: Resource) {
    return this.http.post<Resource>('http://127.0.0.1:8000/api/resource', payload);
  }

  update(payload:Resource){
    return this.http.put(`http://127.0.0.1:8000/api/resource/${payload.id}`,payload);
   }

   getById(id: number) {
    return this.http.get<Resource>(`http://127.0.0.1:8000/api/resource/${id}`);
   }

   delete(id:number){
    return this.http.delete<Resource>(`http://127.0.0.1:8000/api/resource/${id}`);
 }
}
