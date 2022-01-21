import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products-list/products.component";
import {HomeComponent} from "./components/home/home.component";
import {NewProductComponent} from "./components/products/new-product/new-product.component";
import {EditProductComponent} from "./components/products/edit-product/edit-product.component";

const routes: Routes = [
  {path: "products", component:ProductsComponent},
  {path: "newProduct", component:NewProductComponent},
  {path: "editProduct/:id", component:EditProductComponent},
  {path: "", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
