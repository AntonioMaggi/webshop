import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    category_id: null,
    imageUrl: ''
  };
  categories: Category[] = [];
  imageFile: File | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

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
          console.log('Product added successfully', newProduct);
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }
}
