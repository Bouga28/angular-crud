import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../reservation';
import { ReservationsService } from '../reservations.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

  export class EditComponent implements OnInit {
    reservationForm: Reservation = {
      id: 0,
      deb: new Date(Date.now()) ,
      heuredeb: '00:00:00' ,
      fin:  new Date(Date.now()),
      heurefin: '00:00:00'  ,
      approval: false,
      validation: false,
      resource_id:0,
      user_id: 0,

    };
    constructor(
      private route: ActivatedRoute,
      private router:Router,
      private reservationService:ReservationsService
    ) {}
   
    ngOnInit(): void {
      this.route.paramMap.subscribe((param) => {
        var id = Number(param.get('id'));
        this.getById(id);
      });
    }
   
    getById(id: number) {
      this.reservationService.getById(id).subscribe((data) => {
        console.log('Data :',data);
        this.reservationForm = data;
      });
    }
   
    update() {
      this.reservationService.update(this.reservationForm)
      .subscribe({
        next:(data) => {
          this.router.navigate(["/types/home"]);
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }
