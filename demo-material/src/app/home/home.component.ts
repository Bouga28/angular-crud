import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService) {
  }


  ngOnInit() {

  }


}
