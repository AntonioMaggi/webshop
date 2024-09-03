import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  router: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onUpdateProduct(product: any): void {
    this.router.navigate(['/update-product', product.id]);
  }

  onDeleteProduct(id: string | undefined): void {
    if (!id) {
      console.error('Product ID is undefined');
      return;
    }
  
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        console.log('Product deleted successfully');
        this.loadProducts();  // Refresh the list after deletion
      });
    }
  }
  
  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
