import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  readonly apiURL: string;
  product!: Product;
  id: string | null;
  message: string;
  form: FormGroup;
  formData: any;

  constructor(public fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.apiURL = "https://localhost:7251/";

    this.id = this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      id: [null],
      name: [null],
      quantity: [null],
      status: [null],
      description: [null],
      price: [null],
      image: [null],
      fileSource: [null]

    });
    this.message = '';





  }
  ngOnInit(): void {

    this.getProductById(this.id);

  }

  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }


  }

  getProductById(id: any) {
    const result = this.http.get<Product>(`${this.apiURL}product/detail/${id}`).subscribe((result) => {
        this.product = result;
        this.form.patchValue({
          id: this.product.id,
          name: this.product.name,
          quantity: this.product.quantity,
          status: this.product.status,
          description: this.product.description,
          price: this.product.price,
       });
    });
  }
  async updateProduct() {

    if(this.form.get('image')?.value == null){
      this.message = 'Preencha a Imagem';
      return;
    }
    console.log( this.form.get('id')?.value);
    this.formData = new FormData();
    this.formData.append('id', this.form.get('id')?.value);
    this.formData.append('name', this.form.get('name')?.value);
    this.formData.append('quantity', this.form.get('quantity')?.value);
    this.formData.append('status', this.form.get('status')?.value);
    this.formData.append('description', this.form.get('description')?.value);
    this.formData.append('price', this.form.get('price')?.value);
    this.formData.append('image', this.form.get('fileSource')?.value, this.form.get('image')?.value.name);

    try {
      await this.http.put(`${this.apiURL}product/${this.product?.id}`, this.formData).subscribe();
      await this.getProductById(this.id);

      this.message = 'Produto Alterado com Sucesso';


    } catch (err) {
      console.log(err);
    }

  }
}
