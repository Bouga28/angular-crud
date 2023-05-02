import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from 'src/app/types/type';
import { TypeService } from 'src/app/types/type.service';
import { Resource } from '../resource';
import {ResourcesService} from '../resources.service';
 
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  resourceForm: Resource = {
    id: 0,
    name: '',
    description: '',
    type_id: '',
    type: {id: 0, name:'', slug: ''}
  };
  TypeList : Type[] = [];
 
  constructor(private resourceService:ResourcesService,
    private typeService:TypeService,
    private router:Router) {}
 
  ngOnInit(): void {
    this.get();
  }
 
  get() {
    this.typeService.get().subscribe((data) => {
      console.log("data = --------",data);
      this.TypeList = data;
    });
  }




  create(){
    console.log("RessourceForm : ", this.resourceForm);
    this.resourceService.create(this.resourceForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/resources/home"])
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  cancel() {
    this.router.navigate(['/resources']);
  }
}
