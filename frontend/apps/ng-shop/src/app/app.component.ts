import { UsersService} from '@ecommerce/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor (private usersService:UsersService){}

  ngOnInit() {
    this.usersService.initAppSession()
  }
}
