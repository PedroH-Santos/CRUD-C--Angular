import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: Number;
  status: boolean;
}



@Component({
  selector: 'app-list-all-products',
  templateUrl: './list-all-products.component.html',
  styleUrls: ['./list-all-products.component.scss']
})
export class ListAllProductsComponent implements OnInit {
  readonly apiURL: string;
  products: Product[] | undefined;
  constructor(private http: HttpClient) {
    this.apiURL = "https://localhost:7251/";

  }

  ngOnInit(): void {
    this.getAllProducts();

  }
  getAllProducts() {
    this.http.get<Product[]>(`${this.apiURL}product`)
      .subscribe(result => {
        this.products = result;
      });
  }
}
