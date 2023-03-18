import { UsersService } from '@ecommerce/users';
import { Component } from '@angular/core';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor (private usersService:UsersService){}

  ngOnInit() {
    this.usersService.initAppSession()
  }
}
