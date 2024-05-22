import { Component, EventEmitter } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from 'src/data-type';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalAmount: undefined | number;
  totalAmountRs: undefined | string;
  errorMessage = new EventEmitter<string | undefined>(undefined);
  cartData:cart[] | undefined ;
  
  constructor(private productService: ProductService , private route:Router) {

  }

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    this.productService.cartElements(userId).subscribe((result) => {



      let price = 0;
      this.cartData=result ;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * item.quantity);
        }
      })
      this.totalAmount = price + (price / 10) - (price / 10) + 100;
      this.totalAmountRs = this.totalAmount + " INR";


    });
  }

  checkoutData(data: { fname: string, email: string, address: string, paymentMethod: string, totalAmount: string })  //Type of data is mentioned here instead in datatype file because we doen't required it in further code 
  {
    console.log(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;


    if (this.totalAmount) {
      let orderData: order = {
        ...data,
        userId,
        id:undefined

        
      }

      
      this.cartData?.forEach((item)=>{
        this.productService.deleteCartItems(item.id);  //use promice Here If Error Occurs and also confirm id is not going undefined
      })

      this.productService.orderNow(orderData).subscribe((result)=>{
        console.log(result);  
        if(result)
        {
          this.errorMessage.emit("true");
          this.route.navigate(['/my-orders']);
        }      
        else
        {
          this.errorMessage.emit("false");
        }
      });
    }


  }

}
