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

  constructor(private productService: ProductService) {}

  addProduct() {
    // Log the product object
    console.log('Submitting product:', this.product);

    // Set imageUrl to null if it's an empty string
    if (this.product.imageUrl === '') {
      this.product.imageUrl = null;
    }

    this.productService.addProduct(this.product).subscribe(
      (newProduct) => {
        // Handle success
        console.log('Product added successfully', newProduct);
      },
      (error) => {
        // Handle error
        console.error('Error adding product:', error);
      }
    );
  }
}
