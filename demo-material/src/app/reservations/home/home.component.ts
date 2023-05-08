import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { PaginatedReservations } from '../paginated-reservations';
import { Reservation } from '../reservation';
import { ReservationsService } from '../reservations.service';
import { ReservationspaginationService } from '../reservationspagination.service';



declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    'table { min-width: 1000px }',
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

    role: number = 3;
    isLoggedIn = false;
    showAdminBoard = false;
    showRHBoard = false;
    showUserBoard = false;


    _userName: string = '';

    constructor(public service: ReservationspaginationService,
      private reservationservice: ReservationsService,
      private storageService: StorageService,
      private router:Router) { }
   
    ngOnInit(): void {

      this.service.getReservations().then((reservations: PaginatedReservations)=>{
        console.log('NGONINIT data = ', reservations);
        this.allReservations = reservations;});

        if (this.isLoggedIn) {
          const user = this.storageService.getUser();
    
          console.log("user : ", user);
          this.role = user.role_id;
          console.log("role : ", this.role);
    
          this.showAdminBoard = this.role==1;
          this.showRHBoard = this.role==2;
          this.showUserBoard = this.role==3;
    
         
          this.router.navigate(["home"])
    
        }
      
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
