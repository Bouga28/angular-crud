import { Injectable } from '@angular/core';
import { PaginatedReservations } from './paginated-reservations';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationspaginationService {

    public isLoading: boolean = false;
    constructor(private http: HttpClient) { }
    
    getReservations(): Promise<PaginatedReservations>{
      console.log("GET Reservations WITH PAGIMATION...... ");
        this.isLoading = true;
        return this.http.get('http://127.0.0.1:8000/api/reservations')
        .toPromise()
        .then((response) => {
          console.log("RESPONSE : ", response);
            this.isLoading = false;
            return response  as PaginatedReservations
        })
        .catch(this.handleError);
    }

    getReservationsAtUrl(url: string): Promise<PaginatedReservations>{
      this.isLoading = true;
      return this.http.get(url)
      .toPromise()
      .then((response) => {
          this.isLoading = false;
          return response as PaginatedReservations
      })
      .catch(this.handleError);
  }




    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      this.isLoading = false;
      return Promise.reject(error.message || error);
  }
}
