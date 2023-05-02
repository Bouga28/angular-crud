import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from '../type';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

  export class CreateComponent implements OnInit {
    typeForm: Type = {
      id: 0,
      name: '',
      slug: ''

    };
   
    constructor(private typeService:TypeService,
      private router:Router) {}
   
    ngOnInit(): void {}
   
    create(){
      this.typeService.create(this.typeForm)
      .subscribe({
        next:(data) => {
          this.router.navigate(["/types/home"])
        },
        error:(err) => {
          console.log(err);
        }
      })
    }

    cancel() {
      this.router.navigate(['/types']);
    }
  }
