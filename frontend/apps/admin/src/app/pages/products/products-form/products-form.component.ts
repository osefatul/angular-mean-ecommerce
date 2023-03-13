import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Product, ProductsService } from '@ecommerce/products';



@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  editMode = false;
  // productForm: FormGroup;
  isSubmitted = false;
  catagories = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  prodForm = new FormGroup({
    name: new FormControl ("", [Validators.required]),
    brand: new FormControl ("", [Validators.required]),
    price: new FormControl (0, [Validators.required]),
    category: new FormControl ("" , [Validators.required]),
    countInStock: new FormControl ("", [Validators.required]),
    description: new FormControl ("", [Validators.required]),
    image: new FormControl ("", [Validators.required]),
    richDescription: new FormControl (''),
    isFeatured: new FormControl(false)
  })

  get productForm() {
    return this.prodForm.controls;
  }

  ngOnInit(): void {
    this._getCategories();
    this._checkEditMode();
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.catagories = categories;
    });
  }

  onCancel(){
    this.location.back();
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.prodForm.invalid) return;

    //WE ARE SENDING A FORMDATA, NOT A JSON BCOZ WE HAVE A FILE.
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    this.editMode? 
    this._updateProduct(productFormData):
    this._addProduct(productFormData)
  }


  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentProductId = params['id'];
        this.productsService.getProduct(params['id']).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;

          //if we don't wanna send an image with update form we need to switch off validators for it.
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
  }


  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe({
        next: (product: Product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.name} is created!`
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        error:() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not created!'
          });
        }
      }
    );
  }


  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated!'
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
          detail: 'Product is not updated!'
        });
      }
    );
  }


  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.prodForm.patchValue({ image: file });
      this.prodForm.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
}
