import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './reservation';
@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  public isLoading: boolean = false;
  headers = { 'Authorization': 'Bearer my-token' }

  constructor(private http: HttpClient) { }

  
  get(): Observable<any>  {
    return this.http.get<Reservation[]>('http://127.0.0.1:8000/api/reservations');
  }
  create(payload: Reservation) {
    return this.http.post<Reservation>('http://127.0.0.1:8000/api/reservation', payload);
  }

  update(payload:Reservation){
    return this.http.put(`http://127.0.0.1:8000/api/reservation/${payload.id}`,payload);
   }

   getById(id: number) {
    return this.http.get<Reservation>(`http://127.0.0.1:8000/api/reservation/${id}`);
   }

   delete(id:number){
    return this.http.delete<Reservation>(`http://127.0.0.1:8000/api/reservation/${id}`);
 }
}
