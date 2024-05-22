import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from 'src/data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderListIs:undefined | order[] ;
  constructor( private productService : ProductService)
  {

  }

  ngOnInit():void
  {
    this.listOfOrders();
  }

  cancelMyOrder(orderId:number | undefined)
  {
    this.productService.cancelOrder(orderId).subscribe((result)=>{
      if(result)
      {
        this.listOfOrders();
      }
    })
  }

  listOfOrders()
  {
    this.productService.orderList().subscribe((result)=>{
      console.log(result);
      this.orderListIs = result ; 
      
    })
  }

}
