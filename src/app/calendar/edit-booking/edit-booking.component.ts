import {Component, OnInit} from '@angular/core';
import {Booking} from "../../model/Booking";
import {Layout, Room} from "../../model/Room";
import {DataService} from "../../data.service";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  booking: Booking;
  rooms: Array<Room>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;
  users: Array<User>;

  // editBookingEventSubscription : Subscription;
  constructor(private dataService: DataService, private route : ActivatedRoute, private router : Router) {
    this.dataService.getRooms().subscribe(
      next => this.rooms = next
    );
    this.dataService.getUsers().subscribe(
      next => this.users = next
    );

    const id = route.snapshot.queryParams['id'];
    if (id){
      this.dataService.getBooking(+id).subscribe(
        next => this.booking = next
      );
    } else {
      this.booking = new Booking();
    }
  }

  onSubmit(){
    if (this.booking.id == null){
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    } else {
      this.dataService.saveBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );

    }

  }
  ngOnInit(): void {

  }

}
