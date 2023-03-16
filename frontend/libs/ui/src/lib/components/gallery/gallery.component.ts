import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [],
})
export class GalleryComponent implements OnInit {
  selectedImageUrl!: string;
  @Input () images: string[] | any

  
  ngOnInit(): void {
    if (this.hasImages()) {
      this.selectedImageUrl = this.images[0];
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

  //or you can use `get` and make it look like a property.
  hasImages() {
    return this.images?.length > 0;
  }
}
