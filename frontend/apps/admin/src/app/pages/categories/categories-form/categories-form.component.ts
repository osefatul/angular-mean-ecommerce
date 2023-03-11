import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService,Category } from 'libs/products/src';


@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent {
  form:FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId:string;

  constructor(
    private categoriesService: CategoriesService
    ){}

    
}
