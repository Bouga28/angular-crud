import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from 'src/app/types/type';
import { TypeService } from 'src/app/types/type.service';
import { PaginatedResource } from '../paginated-resource';
import { Resource } from '../resource';
import {ResourcesService} from '../resources.service';
 
@Component({
  selector: 'app-create',
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
 
  constructor(private resourceService:ResourcesService,
    private route: ActivatedRoute,
    private typeService:TypeService,
    private router:Router) {}
    private paginatedResource!: PaginatedResource;
 
  ngOnInit(): void {

    this.typeService.get().subscribe((data) => {
      console.log("data = --------",data);
      this.TypeList = data;
    });

    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });


  }

  getById(id: number) {


    this.resourceForm.id=id;
    this.resourceService.getById(id)
    .subscribe((d) => {
      console.log("id : ", id, " data : ", d);
      this.resourceForm = d[0];

    });



  }


  update(){
    console.log("RessourceForm : ", this.resourceForm);
    this.resourceService.update(this.resourceForm)
    .subscribe({
      next:() => {
        
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
