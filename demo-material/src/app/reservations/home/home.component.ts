import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { PaginatedReservations } from '../paginated-reservations';
import { Reservation } from '../reservation';
import { ReservationsService } from '../reservations.service';
import { ReservationspaginationService } from '../reservationspagination.service';



declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    'table { min-width: 1200px }',
  ]
})

  export class HomeComponent implements OnInit {
    allReservations!: PaginatedReservations;
    deleteModal: any;
    idTodelete: number = 0;
    color: ThemePalette = 'accent';
    checked = false;
    disabled = false;

    displayedColumns = ['id', 'deb', 'heuredeb','fin', 'heurefin', 'approval','validation','ressource','user', 'actions'];

    selectedReservation!: Reservation;
    feedback: any = {};



    constructor(public service: ReservationspaginationService,
      private reservationservice: ReservationsService,
      private router:Router) { }
   
    ngOnInit(): void {

      this.service.getReservations().then((reservations: PaginatedReservations)=>{
        console.log('NGONINIT data = ', reservations);
        this.allReservations = reservations;});

      
    }

   
    openDeleteModal(id: number) {
      this.idTodelete = id;
      this.deleteModal.show();
    }
   
    select(selected: Reservation): void {
      this.selectedReservation = selected;
    }

    delete(Reservation: Reservation): void {
      if (confirm('Are you sure?')) {
        this.reservationservice.delete(Reservation.id).subscribe(() => {
            this.feedback = {Reservation: 'success', message: 'Delete was successful!'};
            
            //  this.router.navigate(["/Reservations/home"]);
            location.reload();
          },
          err => {
            this.feedback = {Reservation: 'warning', message: 'Error deleting.'};
          }
        );
      }
    }

  }
