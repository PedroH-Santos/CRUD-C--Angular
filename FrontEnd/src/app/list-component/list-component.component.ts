import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})





export class ListComponentComponent implements OnInit {
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

  deleteProducts(id: any) {
    try {
      this.http.delete(`${this.apiURL}product/${id}`).subscribe(result => {
        this.products = this.products?.filter(product => product.id != id);
      });
    } catch (err) {
      console.log(err);
    }
  }


}
