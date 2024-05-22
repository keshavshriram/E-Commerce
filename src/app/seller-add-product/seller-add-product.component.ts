import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from 'src/data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string | undefined;
  constructor(private product:ProductService)
  {

  }

  submit(data:product):void
  {
    this.product.addProduct(data).subscribe((result)=>{
      console.log(result);

      if(result)
      {
        this.addProductMessage='Product is succesfull added';
      }
      setTimeout(()=>this.addProductMessage=undefined,3000);
      // this.product.addProduct.target.value=""
    });
  }
}
