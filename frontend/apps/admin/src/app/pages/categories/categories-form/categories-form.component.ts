import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { CategoriesService,Category } from 'libs/products/src';
import { CategoriesService,Category } from '@ecommerce/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {

  isSubmitted = false;
  editMode = false;
  currentCategoryId:string;

  constructor(
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute,
    private messageService: MessageService,){}
    
    catForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      icon: new FormControl ('', [Validators.required]),
      color: new FormControl ('#fff', [Validators.required])
    });

    ngOnInit(): void {
      console.log(this.catForm.value)
      // console.log(this.catForm.controls.name)
      this._checkEditMode();
    }

    onSubmit(){
      this.isSubmitted = true;
      if(this.catForm.invalid) return ;

      const category: Category = {
        id: this.currentCategoryId,
        name: this.categoryForm.name.value,
        icon: this.categoryForm.icon.value,
        color: this.categoryForm.color.value
      };

      this.editMode ?
      this.updateCategory(category):
      this.addCategory(category)
    }


    private addCategory(category: Category) {
      this.categoriesService.createCategory(category).subscribe({
        next: (category: Category) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Category ${category.name} is created!`
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
            detail: 'Category is not created!'
          });
        }
      }
      );
    }

    private updateCategory(category: Category) {
      this.categoriesService.updateCategory(category).subscribe({
        complete:() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category is updated!'
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
            detail: 'Category is not updated!'
          });
        }
      }
      );
    }


    private _checkEditMode() {
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.editMode = true;
          this.currentCategoryId = params['id'];
          this.categoriesService.getCategory(params['id']).subscribe((category) => {
            this.categoryForm.name.setValue(category.name);
            this.categoryForm.icon.setValue(category.icon);
            this.categoryForm.color.setValue(category.color);
          });
        }
      });
    }

    cancel(){
      this.location.back();
    }
    

    get categoryForm(){
      return this.catForm.controls
    }
}
