import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from '../type';
import { TypeService } from '../type.service';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    'table { min-width: 600px }',
  ]
})

  export class HomeComponent implements OnInit {
    allTypes: Type[] = [];
    deleteModal: any;
    idTodelete: number = 0;

    displayedColumns = ['id', 'name', 'slug', 'actions'];

    selectedType!: Type;
    feedback: any = {};


    constructor(private typeService: TypeService, private router:Router,) {}
   
    ngOnInit(): void {


      this.get();
    }
   
    get() {
      this.typeService.get().subscribe((data) => {
        this.allTypes = data;
      });
    }

    openDeleteModal(id: number) {
      this.idTodelete = id;
      this.deleteModal.show();
    }
   
    select(selected: Type): void {
      this.selectedType = selected;
    }

    delete(type: Type): void {
      if (confirm('Are you sure?')) {
        this.typeService.delete(type.id).subscribe(() => {
            this.feedback = {type: 'success', message: 'Delete was successful!'};
      
              location.reload();
  
          },
          err => {
            this.feedback = {type: 'warning', message: 'Error deleting.'};
          }
        );
      }
    }
  }
