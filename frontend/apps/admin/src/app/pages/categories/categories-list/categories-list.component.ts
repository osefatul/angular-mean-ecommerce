import { Category } from 'libs/products/src';
import { CategoriesService } from 'libs/products/src';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[]=[]

  constructor(
    private categoriesService:CategoriesService,
    private router:Router
    ){}

    ngOnInit(): void {
      this._getCategories();
    }


    private _getCategories() {
      this.categoriesService.getCategories().subscribe(cat => {
        console.log(cat)
      })
    }
}
