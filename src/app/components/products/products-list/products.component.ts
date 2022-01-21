import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {Product} from "../../../model/product.model";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {AppDataState, DataStateEnum} from "../../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;



  // on fait l'injection du service au sein du constructeur
  constructor(private productService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$= this.productService.getAllProducts().pipe(
        map(data=>{
          return ({dataState:DataStateEnum.LOADED ,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

  onGetSelectedProducts() {
    this.products$= this.productService.getSelectedProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED ,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$= this.productService.getAvailableProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED ,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any) {
    console.log("hi from onSearch")
    this.products$= this.productService.SearchProducts(dataForm.keyword).pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED ,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSelect(p: Product) {
    this.productService.Select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDelete(p: Product) {
    let v = confirm("Voulez vous vraiment supprimer ce produit ?");
    if (v==true)
    this.productService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  onNewProduct() {
  this.router.navigateByUrl("/newProduct")
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/+p.id")

  }
}
