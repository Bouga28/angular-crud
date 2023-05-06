import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UsersService } from '../users.service';


declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    'table { min-width: 600px }',
  ]
})

  export class HomeComponent implements OnInit {
    allUsers: User[] = [];
    deleteModal: any;
    idTodelete: number = 0;

    displayedColumns = ['id', 'name', 'email', 'actions'];

    selectedUser!: User;
    feedback: any = {};


    constructor(private usersService: UsersService, private router:Router,) {}
   
    ngOnInit(): void {


      this.get();
    }
   
    get() {
      this.usersService.get().subscribe((data) => {
        this.allUsers = data;
      });
    }

    openDeleteModal(id: number) {
      this.idTodelete = id;
      this.deleteModal.show();
    }
   
    select(selected: User): void {
      this.selectedUser = selected;
    }

    delete(user: User): void {
      if (confirm('Are you sure?')) {
        this.usersService.delete(user.id).subscribe(() => {
            this.feedback = {user: 'success', message: 'Delete was successful!'};
      
              location.reload();
  
          },
          err => {
            this.feedback = {user: 'warning', message: 'Error deleting.'};
          }
        );
      }
    }
  }
