import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from 'src/data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string | undefined;
  constructor(private product:ProductService, private router:Router)
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
      setTimeout(()=>
      {
        this.router.navigate(['seller-home']);
        this.addProductMessage=undefined
      }
      ,1000);
      
      // this.product.addProduct.target.value=""
    });
  }
}
