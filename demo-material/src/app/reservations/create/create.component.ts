import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from '../reservation';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

  export class CreateComponent implements OnInit {
    reservationForm: Reservation = {
      id: 0,
      deb: new Date(Date.now()) ,
      fin:  new Date(Date.now()),
      approval: false,
      resource_id:0,
      user_id: 0,

    };
   
    constructor(private reservationService:ReservationsService,
      private router:Router) {}
   
    ngOnInit(): void {}
   
    create(){
      this.reservationService.create(this.reservationForm)
      .subscribe({
        next:(data) => {
          this.router.navigate(["/reservations/home"])
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }