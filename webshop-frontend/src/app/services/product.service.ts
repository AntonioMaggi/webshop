import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category_id: number | null;
  category_name?: string;
  imageUrl?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product, imageFile: File | null): Observable<Product> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    return this.http.post<Product>(this.apiUrl, formData);
  }
}
