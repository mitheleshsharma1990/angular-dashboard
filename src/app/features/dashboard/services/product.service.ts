import { Injectable, inject } from '@angular/core';
import { Product } from '../../products/models/product';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  url = 'https://dummyjson.com/products';

  getProducts(skip: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}?limit=20&skip=${skip}`).pipe(
      // Map the response to extract the products array
      map((response: any) => response.products as Product[]),
    );
  }

  searchProducts(query: string, skip: number): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.url}/search?q=${query}&limit=20&skip=${skip}`)
      .pipe(map((response: any) => response.products as Product[]));
  }

  getProductByCategory(category: string, skip: number) {
    return this.http
      .get<Product[]>(`${this.url}/category/${category}?limit=20&skip=${skip}`)
      .pipe(map((response: any) => response.products as Product[]));
  }
}
