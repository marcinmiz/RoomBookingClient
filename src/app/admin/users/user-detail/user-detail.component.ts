import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../model/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  user : User;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  editUser(){
  this.router.navigate(['admin','users'],{queryParams: {action: 'edit', id: this.user.id}})
  }
}
