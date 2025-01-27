import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private jsonUrl = 'assets/products.json';
  private jsonUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  createProduct(product: any): Observable<any> {
    console.log('Отправка продукта на сервер:', product);
    return this.http.post(this.jsonUrl, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.jsonUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.jsonUrl}/${id}`);
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
