import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/User";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";
import {error} from "selenium-webdriver";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  user : User;
  constructor(private dataService : DataService, private router : Router) { }

  @Output()
  dataChangedEvent = new EventEmitter();

  message ='';

  ngOnInit(): void {
  }

  editUser(){
  this.router.navigate(['admin','users'],{queryParams: {action: 'edit', id: this.user.id}})
  }

  deleteUser() {
    const result = confirm('Are you sure you wish to delete this user?');
    if (result) {
      this.message = 'deleting...';
      this.dataService.deleteUser(this.user.id).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users']);
        },
        error => this.message = 'Sorry, this user cannot be deleted at this time.'
      );
    }
  }

  resetPassword(){
    this.message = 'please wait...';
    this.dataService.resetUserPassword(this.user.id).subscribe(
      next => this.message = 'The password has been reset.',
      error => this.message = 'Sorry, something went wrong.'
    );
  }
}
