import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User, UsersService } from 'libs/users/src/index';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: []
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];

  //for avoiding data/memory leak.
  endSub$: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  ngOnDestroy(){
    console.log("component destroyed");
    this.endSub$.complete();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe({
          complete:  () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!'
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!'
            });
          }
        }
        );
      }
    });
  }

  updateUser(userid: string) {
    this.router.navigateByUrl(`users/form/${userid}`);
  }

  getCountryName(countryKey: string) {
    return this.usersService.getCountry(countryKey);
  }

  private _getUsers() {
    // this.usersService.getUsers().subscribe((users) => {
    //   this.users = users;
    // });

    this.usersService.getUsers()
    .pipe(takeUntil(this.endSub$))
    .subscribe((users) => {
      this.users = users;
    });
  }
}
