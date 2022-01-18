import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {Product} from "../../../model/product.model";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {AppDataState, DataStateEnum} from "../../../state/product.state";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;


  // on fait l'injection du service au sein du constructeur
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    console.log("start...");
    this.products$= this.productService.getAllProducts().pipe(
        map(data=>{
          return ({dataState:DataStateEnum.LOADED ,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }
}
