import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from 'src/data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | product[] ;
  productDeletedMessage: undefined|string;
  
  constructor(private product:ProductService)
  {

  }

  ngOnInit()
  {
    let seller=localStorage.getItem('seller');
    let sellerId=seller && JSON.parse(seller)[0].id;
    // console.log("Seller Id is:",sellerId);
    
    this.proList(sellerId);
  }

  deleteProduct(id:number)
  {
    return this.product.deleteFun(id).subscribe((res)=>{
      console.log(res);

      if(res)
      {
        this.productDeletedMessage="Product Deleted Succesfully";
      }

      let seller=localStorage.getItem('seller');
      let sellerId=seller && JSON.parse(seller)[0].id;
      this.proList(sellerId);  //this line is to update seller home after deletion of product
      setTimeout(()=>{
        this.productDeletedMessage=undefined;
      },1000);
    });

    
  }

  proList(sellerId:number) //Product List
  {
    this.product.productList(sellerId).subscribe((result)=>{
      console.log(result);
      this.productList=result;
    })
  }

}
