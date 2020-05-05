import {Component, OnInit} from '@angular/core';
import {Booking} from "../model/Booking";
import {DataService} from "../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings: Array<Booking>;
  selectedDate: string;
  message = '';
  dataLoaded = false;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {

  }

  loadData() {
    this.message = 'Loading data...';
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          next => {
            this.bookings = next;
            this.dataLoaded = true;
            this.message = '';
          }
        );
      },
      error => {
        this.message = 'Sorry, the data could not be loaded.';
      }
    );

  }

  ngOnInit(): void {
    this.loadData();
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {queryParams: {id}});
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id: number) {
    if (confirm('Are you sure you wish to delete this booking?')) {
      this.message = 'deleting please wait...';
      this.dataService.deleteBooking(id).subscribe(
        next => {
          this.message = '';
          this.loadData();
        },
        error => this.message = 'Sorry, this booking cannot be deleted at this time.'
      );
    }
  }

  dateChanged() {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}});
  }
}
