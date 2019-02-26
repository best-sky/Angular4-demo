import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx'
import { HttpClient, HttpParams } from '@angular/common/http';
import { encode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  searchEvent:EventEmitter<ProductSearchParams> = new EventEmitter()
  // private products:Product[] = [
  //   new Product(1,"第一个商品",1.99,3.5,"这是第一个商品11",['电子产品', '硬件设备']),
  //   new Product(2,"第二个商品",2.99,4.5,"这是第一个商品12",['图书']),
  //   new Product(3,"第三个商品",3.99,1.5,"这是第一个商品13",['硬件设备']),
  //   new Product(4,"第四个商品",4.99,2.5,"这是第一个商品14",["电子产品","硬件设备"]),
  //   new Product(5,"第五个商品",5.99,1.5,"这是第一个商品15",["电子产品"]),
  //   new Product(6,"第六个商品",6.99,3.5,"这是第一个商品16",["图书"]),
  // ]
  // private comments:Comment[] = [
  //   new Comment(1,1,"2019-01-24 13:23:44","张三",3,"东西不错"),
  //   new Comment(2,1,"2019-01-24 13:23:44","张二",3,"东西不错"),
  //   new Comment(3,1,"2019-01-24 13:23:44","张四",3,"东西不错"),
  //   new Comment(4,2,"2019-01-24 13:23:44","张啊",3,"东西不错"),
  // ]
  constructor(private http: HttpClient) { }

  getAllCategories(): string[] {
    return ["电子产品","硬件设备","图书"];
  }

  getProducts(){
    return this.http.get('/api/products');
  }

  getProduct(id:number): Observable<any>{
    return this.http.get('/api/product/'+id);
  }

  getCommentsForProductId(id:number):Observable<any>{
    return this.http.get("/api/product/"+id+"/comments")
  }

  search(params:ProductSearchParams): Observable<any>{
    return this.http.get("/api/products",{params: this.encodeParams(params)})
  }
  private encodeParams(params:ProductSearchParams){
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return httpParams
  }
}
export class ProductSearchParams {
  constructor(
    public title:string,
    public price:number,
    public category:string
  ){}
}
export class Product {
    constructor(
      public id:number,
      public title:string,
      public price:number,
      public rating:number,
      public desc:string,
      public categories:Array<string>
    ){

    }
}
export class Comment {
  constructor(
    public id:number,
    public productId:number,
    public timestamp:string,
    public user:string,
    public rating:number,
    public content:string
  ){

  }
}