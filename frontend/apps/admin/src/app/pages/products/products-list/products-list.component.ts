import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@ecommerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products = [];

  constructor(
    private productsService:ProductsService,
    private messageService:MessageService,
    private router:Router,
    private confirmationService:ConfirmationService
    ){}


    ngOnInit(): void {
      this.getProducts();
    }

    private getProducts (){
      this.productsService.getProducts().subscribe(prods=>{
        this.products = prods
      })
    }

    updateProduct (productId:string){
      this.router.navigateByUrl(`/products/form/${productId}`)
    }

    deleteProduct(categoryId: string) {      
      this.confirmationService.confirm({
        message: 'Do you want to Delete this Category?',
        header: 'Delete Category',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.productsService.deleteProduct(categoryId).subscribe({
            complete: () => {
              this.getProducts();// call getCategories again
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Category is deleted!'
              });
            },
            error: () => {
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
