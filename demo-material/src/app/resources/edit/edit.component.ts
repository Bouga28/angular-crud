import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from 'src/app/types/type';
import { TypeService } from 'src/app/types/type.service';
import { Resource } from '../resource';
import { ResourcesService } from '../resources.service';

 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  resourceForm: Resource = {
    id: 0,
    name: '',
    description: '',
    type_id: '',
    type: {id: 0, name:'', slug: ''}
  };
  TypeList : Type[] = [];

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private resourceService: ResourcesService,
    private typeService:TypeService
  ) {}
 
  ngOnInit(): void {
    this.get();
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });

  }
 
  get() {
    this.typeService.get().subscribe((data) => {
      console.log("data = --------",data);
      this.TypeList = data;
    });
  }


  getById(id: number) {
    this.resourceService.getById(id).subscribe((data) => {
      this.resourceForm = data;
    });
  }
 
  update() {
    this.resourceService.update(this.resourceForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/resources/home"]);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
}
