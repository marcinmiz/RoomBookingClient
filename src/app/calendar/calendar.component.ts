import {Component, OnInit} from '@angular/core';
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings: Array<Booking>;

  constructor(private dataService: DataService, private router: Router) {
    dataService.getBookings().subscribe(
      next => {
        this.bookings = next;
      }
    );
  }

  ngOnInit(): void {

  }

  editBooking(id : number){
    this.router.navigate(['editBooking'], {queryParams: {id}});
  }
}
