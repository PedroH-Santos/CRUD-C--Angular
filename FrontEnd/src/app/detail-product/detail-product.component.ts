import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


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
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  readonly apiURL: string;
  product: Product | undefined;
  constructor( private http: HttpClient,private route:ActivatedRoute) {
    this.apiURL = "https://localhost:7251/";

    const id = this.route.snapshot.paramMap.get('id');
    this.getProductById(id);


   }

  ngOnInit(): void {
  }
  getProductById(id: any){
    this.http.get<Product>(`${this.apiURL}product/detail/${id}`)
    .subscribe(result => {
      this.product = result;
    });
  }
}
