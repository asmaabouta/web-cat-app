import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({providedIn:"root"})
export class ProductsService {
  constructor(private http:HttpClient)
  {}

  getAllProducts():Observable<Product[]>{
    //variable host declarer dans environment.ts
    let host=(Math.random()>0.1)?environment.host:environment.unreachableHost;

  //return this.http.get("http://localhost:3000/products");
    return this.http.get<Product[]>(host+"/products");
  }


  getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?selected=true");
  }

  getAvailableProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?available=true");
  }
}
