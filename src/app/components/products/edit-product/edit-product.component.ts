import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId?:number
  constructor(private activatedRoute:ActivatedRoute) {
    this.productId=activatedRoute.snapshot.params.id;

  }
  ngOnInit(): void {
  }

}
