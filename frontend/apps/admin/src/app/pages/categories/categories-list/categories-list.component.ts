import { CategoriesService,Category } from 'libs/products/src';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit, OnDestroy  {
  categories: Category[]=[]
  endSub$: Subject<any> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

    ngOnInit(): void {
      this.getCategories();
    }

    ngOnDestroy(): void {
      this.endSub$.complete();
    }

    private getCategories() {
      // this.categoriesService.getCategories().subscribe(cats => {
      //   this.categories = cats
      // })

      this.categoriesService.getCategories()
      .pipe(takeUntil(this.endSub$)).subscribe(cats => {
        this.categories = cats
      })
    }

    updateCategory(categoryId: string) {
      this.router.navigateByUrl(`categories/form/${categoryId}`);
    }

    deleteCategory(categoryId: string) {      
      this.confirmationService.confirm({
        message: 'Do you want to Delete this Category?',
        header: 'Delete Category',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.categoriesService.deleteCategory(categoryId).subscribe({
            complete: () => {
              this.getCategories();// call getCategories again
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Category is deleted!'
              });
            },
            error:  () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Category is not deleted!'
              });
            }
          }

          
          );
        }
      });
    }
}
