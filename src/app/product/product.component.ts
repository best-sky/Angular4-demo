import { Component, OnInit } from '@angular/core';
import { Product ,ProductService} from '../shared/product.service';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  private products:Observable<any>;
 
  constructor(private productService: ProductService) {
    
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.search(params)
    );
  }

}
