import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService,Category } from 'libs/products/src';
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
    private messageService: MessageService,

    ){}
    
    catForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      icon: new FormControl ('', [Validators.required]),
      color: new FormControl ('#fff')
    });

    ngOnInit(): void {
      console.log(this.catForm.value)
      // console.log(this.catForm.controls.name)
    }

    onSubmit(){
      this.isSubmitted = true;
      if(this.catForm.invalid) return ;

      this.addCategory(this.catForm.value)
    }


    private addCategory(category: Category) {
      this.categoriesService.createCategory(category).subscribe(
        (category: Category) => {
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
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category is not created!'
          });
        }
      );
    }
    

    get categoryForm(){
      return this.catForm.controls
    }
}
