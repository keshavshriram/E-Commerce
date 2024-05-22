import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary, product } from 'src/data-type';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartArray: undefined | cart[];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private productSevice: ProductService, private route:Router) {

  }


  ngOnInit(): void {
    this.cartData();

  }


  cartData() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    this.productSevice.cartElements(userId).subscribe((result) => {
      console.log("Elements in cart are:", result);
      this.cartArray = result;

      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * item.quantity);
        }
      })

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = (this.priceSummary.price) + (this.priceSummary.tax) + (this.priceSummary.delivery) - (this.priceSummary.discount);
      // console.log(this.priceSummary);

      if(!this.cartArray.length)
      {
        this.route.navigate(['/']);
      }

      //On Reload Cart Number Updating Code
      this.productSevice.cartList(userId).subscribe((res) => {
        this.productSevice.cartAllData.emit(res);
      })
    });

  }

  removeToCartFromCartPage(id: number) {
    this.productSevice.removeToCart(id).subscribe((result) => {
      if (result) {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;

        // this.productSevice.cartList(userId).subscribe((res) => {
        //   this.productSevice.cartAllData.emit(res);
        // })

        this.cartData();
      }
    });
  }

  checkout()
  {
    return this.route.navigate(['/checkout']);
  }

}
