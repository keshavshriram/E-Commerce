import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from 'src/data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
productData: undefined | product;
productUpdatedMessage:undefined | string ;
  constructor( private route:ActivatedRoute, private product:ProductService,private router:Router)
  {

  }
    
    ngOnInit():void{
      let productId=this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.product.updateFun(productId).subscribe((data)=>{
      // console.log(data);
      this.productData=data;
    });
    }
  

  update(data:product)
  {
    if(this.productData)
    {
      data.id=this.productData.id;
    }
    // data.id=this.productData.id
    this.product.setUpdate(data).subscribe((result)=>{
      // console.log(result);
      if(result)
      {
        this.productUpdatedMessage="Product Updated Succesfully";
        
       
      }
    });
    setTimeout(()=>{
      this.productUpdatedMessage=undefined;
      this.router.navigate(['seller-home']);
    },2000);
     
  }
}
