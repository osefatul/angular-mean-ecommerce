import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService,Category } from 'libs/products/src';


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
    private categoriesService: CategoriesService
    ){}
    
    catForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      icon: new FormControl ('', [Validators.required]),
      color: new FormControl ('#fff')
    });
    
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


    // ngOnInit(): void {}
    
}
