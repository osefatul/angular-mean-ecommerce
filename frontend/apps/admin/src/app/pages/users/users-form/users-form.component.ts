import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@ecommerce/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: []
})
export class UsersFormComponent implements OnInit {
  isSubmitted = false;
  editmode = false;
  currentUserId: string;
  countries = [];

  constructor(
    private messageService: MessageService,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  form = new FormGroup({
    name: new FormControl ('', [Validators.required]),
    password: new FormControl ('', [Validators.required]),
    email: new FormControl ('', [Validators.required , Validators.email]),
    phone: new FormControl ('', [Validators.required]),
    isAdmin: new FormControl (false),
    street: new FormControl (''),
    apartment: new FormControl (''),
    zip: new FormControl (''),
    city: new FormControl (''),
    country: new FormControl (''),
  });

  get userForm() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this._checkEditMode();
    this.getCountries();
  }


  private getCountries() {
    this.countries = this.usersService.getCountries();
  }


  //Fetch countries from library
  // private getCountries () {
  //   countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
  //   this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry =>{
  //     return {
  //       id: entry[0],
  //       name: entry[1]
  //     }
  //   })
  //   console.log(this.countries);
  // }


  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe({
      //complete doesn't work here as we are passing `user` parameter.
        next: (user: User) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User ${user.name} is created!`
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },

        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User is not created!'
          });
        }
      }
    
    );
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService.getUser(params['id']).subscribe((user) => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value
    };


    if (this.editmode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  onCancel() {
    this.location.back();
  }


}
