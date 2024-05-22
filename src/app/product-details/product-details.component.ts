import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from 'src/data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  fetchedProduct: undefined | product;
  productCount: number = 1;
  removeCart: boolean = false;
  productDetailData:product | undefined;

  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private userService: UserService) {

  }

  ngOnInit() {
    const productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.log(productId);
    productId && this.productService.productDetails(productId).subscribe((result) => {
      // console.log(result);
      this.fetchedProduct = result;
    });

    let cartData = localStorage.getItem('localCart');
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      let item = items.filter((item: product) => productId == item.id.toString());
      if (item.length) {
        this.removeCart = true;
      }
      else {
        this.removeCart = false;
      }

    }


    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    let cartListPromise = new Promise((responsed, rejected) => {
      if (user) {

        this.productService.cartList(userId).subscribe((result) => {
          this.productService.cartAllData.emit(result);

          responsed(result);
        });

      }

      else {
        rejected("Rejected req for cart item list");
      }

    });

    cartListPromise
      .then((result) => {
        console.log("Rsponsed with result", result);
      })
      .catch(error => {
        console.log("thrown error which is", error);
      })




    //After providing promise and emitting Database cart List ,We are going to update removeCart

    if (user) {
      this.productService.cartAllData.subscribe((res) => 
      {
        let item = res.filter((item: product) => productId?.toString() === item.productId?.toString());
        console.log("Previously Remove cart is :", this.removeCart);
        
        if (item.length) 
        {
          this.removeCart = true;
          this.productDetailData=item[0];
          // console.log("Remove cart is now:", this.removeCart);
        }
      });

    }




  }

  handleQuantity(data: string) {
    if (data == 'plus') {
      this.productCount++;
    }
    else if (this.productCount > 1 && data == 'min') {
      this.productCount--;
    }
  }

  addToCart(data: product) {
    // this.userService.addCart(data)
    if (this.fetchedProduct) {
      this.fetchedProduct.quantity = this.productCount;
      // console.log(this.fetchedProduct);
      if (!localStorage.getItem('user')) {
        this.productService.localStorageCart(this.fetchedProduct);
        this.removeCart = true;
      }
      else {
        // console.log("User Logged In");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log("Users Id Is:",userId);

        let cartData: cart = {
          ...this.fetchedProduct,
          userId: userId,
          productId: this.fetchedProduct.id,

        }

        // console.log(cartData);
        this.productService.addCart(cartData).subscribe((result) => {
          console.log(result);
          if (result) {

            this.productService.cartList(userId).subscribe((result) => {
              this.productService.cartAllData.emit(result);
            });

            this.removeCart = true;
          }
        });

      }

    }

  }

  removeFromCart(id: number) {

    if (!localStorage.getItem('user')) 
    {
      this.productService.removeItemFromCart(id);
      this.removeCart = false;
    }
    else
    {
      console.log(this.productDetailData);
      this.productDetailData && this.productService.removeToCart(this.productDetailData.id).subscribe((result)=>{
        if(result)
        {
          let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
          this.productService.cartList(userId).subscribe((res)=>{
            this.productService.cartAllData.emit(res);
            this.removeCart = false;
          });
        }
      });
    }
  }


}
