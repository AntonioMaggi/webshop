import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  };
  imageFile: File | null = null;

  constructor(private productService: ProductService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  addProduct() {
    if (this.imageFile) {
      this.productService.addProduct(this.product, this.imageFile).subscribe(
        (newProduct) => {
          // Handle success
          console.log('Product added successfully', newProduct);
        },
        (error) => {
          // Handle error
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }
}
