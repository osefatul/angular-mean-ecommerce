import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@ecommerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products = [];
  endSub$: Subject<any> = new Subject();

  constructor(
    private productsService:ProductsService,
    private messageService:MessageService,
    private router:Router,
    private confirmationService:ConfirmationService
    ){}


    ngOnInit(): void {
      this.getProducts();
    }

    ngOnDestroy(): void {
        this.endSub$.complete();
    }

    private getProducts (){
      // this.productsService.getProducts().subscribe(prods=>{
      //   this.products = prods
      // })
    
      this.productsService.getProducts()
      .pipe(takeUntil(this.endSub$))
      .subscribe(prods=>{
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
