import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(
  private http: HttpClient
) { }

public getProducts(params: { page: number; pageSize: number }){
  return this.http.get('http://localhost:5169/products', { params });
}

public getProduct(id: number){
  return this.http.get('http://localhost:5169/products/' + id);
}


public createProduct(body: any){
  return this.http.post('http://localhost:5169/products', body);
}

public updateProduct(id: number, body: any){
  return this.http.put('http://localhost:5169/products/'+ id, body);
}

public deleteProduct(id: number){
  return this.http.delete('http://localhost:5169/products/'+ id);
}

}