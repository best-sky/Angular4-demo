import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService,Comment } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent implements OnInit {
  //声明标题
  product: Product;
  comments: Comment[];
  constructor(
    private routeInfo:ActivatedRoute,
    private productService: ProductService
    ) { }

  ngOnInit() {
    let productId:number = this.routeInfo.snapshot.params["productId"]
    this.product = this.productService.getProduct(productId);
    this.comments = this.productService.getCommentsForProductId(productId)
    // this.productTitle = this.routeInfo.snapshot.params["prodTitle"]
  }

}