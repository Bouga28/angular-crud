import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Reservation } from '../reservation';
import { ReservationsService } from '../reservations.service';
import { Time } from "@angular/common";
import { Resource } from 'src/app/resources/resource';
import { ResourcesService } from 'src/app/resources/resources.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

  export class CreateComponent implements OnInit {

    isLoggedIn = false;
   


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
   
    ResGetRessource : any ;
    RessourceList : Resource[] = [];

    constructor(private reservationService:ReservationsService,
      private resourceService:ResourcesService,
      private storageService: StorageService,
      private router:Router) {}
   
    ngOnInit(): void {
      this.get();
    }
   
    get() {
      this.resourceService.get().subscribe((d) => {
        this.RessourceList = d;
      });

      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
  
        console.log("user : ", user);

        this.reservationForm.user_id = user.id ; 

  
       
        this.router.navigate(["home"])
  
      }







    }
   
    create(){
      console.log("REQUEST :", this.reservationForm);
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


    cancel() {
      this.router.navigate(['/reservations']);
    }
  }