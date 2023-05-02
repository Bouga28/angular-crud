import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { PaginatedResource } from '../paginated-resource';
import { Resource } from '../resource';
import { ResourcesService } from '../resources.service';
import { ResourcespaginationService } from '../resourcespagination.service';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  deleteModal: any;
  idTodelete: number = 0;

    resources!:PaginatedResource;
    constructor(public service: ResourcespaginationService,
      private resourceService: ResourcesService) { }
  
    ngOnInit() {

      this.deleteModal = new window.bootstrap.Modal(
        document.getElementById('deleteModal')
      );


      this.service.getResources().then(resources=>{
        console.log('NGONINIT data = ', resources);
        this.resources = resources;});
    }
  
    prevPage() {
      this.service.getResourcesAtUrl(this.resources.prev_page_url).then(resources=>this.resources = resources);
    }
  
    nextPage() {
      console.log('testtttttt : ',this.resources.next_page_url);
      this.service.getResourcesAtUrl(this.resources.next_page_url).then(resources=>this.resources = resources);
      console.log('this.resources : ',this.resources);
    }
  

    openDeleteModal(id: number) {
      this.idTodelete = id;
      this.deleteModal.show();
    }
   
    delete() {
      this.resourceService.delete(this.idTodelete).subscribe({
        next: (data) => {
          this.resources.data = this.resources.data.filter(_ => _.id != this.idTodelete)
          this.deleteModal.hide();
        },
      });
    }








  }
