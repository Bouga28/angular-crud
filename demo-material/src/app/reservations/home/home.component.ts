import { Component, OnInit } from '@angular/core';
import { PaginatedReservations } from '../paginated-reservations';
import { Reservation } from '../reservation';
import { ReservationsService } from '../reservations.service';
import { ReservationspaginationService } from '../reservationspagination.service';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

  export class HomeComponent implements OnInit {
    allReservations: Reservation[] = [];
    deleteModal: any;
    idTodelete: number = 0;
    reservations!:PaginatedReservations;
    
    constructor(public service: ReservationspaginationService,
      private reservationsService: ReservationsService) {}
   
    ngOnInit(): void {
      this.deleteModal = new window.bootstrap.Modal(
        document.getElementById('deleteModal')
      );

      this.service.getReservations().then(reservations=>{
        console.log('NGONINIT data = ', reservations);
        this.reservations = reservations;});
    }
   


    prevPage() {
      this.service.getReservationsAtUrl(this.reservations.prev_page_url).then(reservations=>this.reservations = reservations);
    }
  
    nextPage() {
      console.log('testtttttt : ',this.reservations.next_page_url);
      this.service.getReservationsAtUrl(this.reservations.next_page_url).then(reservations=>this.reservations = reservations);
      console.log('this.reservations : ',this.reservations);
    }
  

    openDeleteModal(id: number) {
      this.idTodelete = id;
      this.deleteModal.show();
    }
   
    delete() {
      console.log(" . Delete  ", this.idTodelete, " type ");
      this.reservationsService.delete(this.idTodelete).subscribe({
        next: (data) => {
          this.allReservations = this.allReservations.filter(_ => _.id != this.idTodelete)
          this.deleteModal.hide();
        },
      });
    }
  }
