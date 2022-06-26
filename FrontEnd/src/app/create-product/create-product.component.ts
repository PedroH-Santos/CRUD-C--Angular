import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  readonly apiURL: string;
  message: string;
  form: FormGroup;
  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: [null],
      quantity: [null],
      status: [null],
      description: [null],
      price: [null],
      image: [null],
      fileSource: [null]

    });
    this.apiURL = "https://localhost:7251/";
    this.message = '';
  }
  ngOnInit(): void {
  }


  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }


  }
  insertProduct() {
    var formData = new FormData();


    formData.append('name', this.form.get('name')?.value);
    formData.append('quantity', this.form.get('quantity')?.value);
    formData.append('status', this.form.get('status')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('price', this.form.get('price')?.value);
    formData.append('image', this.form.get('fileSource')?.value,this.form.get('image')?.value.name );
    try {
      this.http.post(`${this.apiURL}product`,formData).subscribe();
      this.message = 'Produto Cadastrado com Sucesso';

      this.form.patchValue({
        name: [null],
        quantity: [null],
        status: [null],
        description: [null],
        price: [null],
        image: [null],
        fileSource: [null]
     });


    } catch (err) {
      console.log(err);
    }

  }

}
