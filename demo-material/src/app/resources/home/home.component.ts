import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResource } from '../paginated-resource';
import { Resource } from '../resource';
import { ResourcesService } from '../resources.service';
import { ResourcespaginationService } from '../resourcespagination.service';


declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    'table { min-width: 600px }',
  ]
})

  export class HomeComponent implements OnInit {
    allResources!: PaginatedResource;
    deleteModal: any;
    idTodelete: number = 0;

    displayedColumns = ['id', 'name', 'description', 'type', 'actions'];

    selectedResource!: Resource;
    feedback: any = {};



    constructor(public service: ResourcespaginationService,
      private resourceService: ResourcesService,
      private router:Router) { }
   
    ngOnInit(): void {

      this.service.getResources().then((resources: PaginatedResource)=>{
        console.log('NGONINIT data = ', resources);
        this.allResources = resources;});

      
    }

   
    openDeleteModal(id: number) {
      this.idTodelete = id;
      this.deleteModal.show();
    }
   
    select(selected: Resource): void {
      this.selectedResource = selected;
    }

    delete(Resource: Resource): void {
      if (confirm('Are you sure?')) {
        this.resourceService.delete(Resource.id).subscribe(() => {
            this.feedback = {Resource: 'success', message: 'Delete was successful!'};
            
            //  this.router.navigate(["/resources/home"]);
            location.reload();
          },
          err => {
            this.feedback = {Resource: 'warning', message: 'Error deleting.'};
          }
        );
      }
    }

  }
