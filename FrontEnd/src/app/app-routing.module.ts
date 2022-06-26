import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ListAllProductsComponent } from './list-all-products/list-all-products.component';
import { ListComponentComponent } from './list-component/list-component.component';

const routes: Routes = [
  {path: 'edit/:id', component: EditProductComponent},
  {path: 'create', component: CreateProductComponent},
  {path: 'detail/:id', component: DetailProductComponent},
  {path: 'list', component: ListComponentComponent},
  {path: 'products', component: ListAllProductsComponent},
  {path: '', redirectTo:'/list', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
