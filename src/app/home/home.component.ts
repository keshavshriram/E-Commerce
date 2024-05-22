import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserSignUp, product } from 'src/data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productList: undefined | product[];
  constructor(private productService: ProductService, private userService: UserService) {

  }

  ngOnInit() {
    this.productService.productListHome().subscribe((result) => {
      if (result) {
        this.productList = result;
        console.log(this.productList);
      }
      // if(localStorage.getItem('user'))
      // {
      //   let user=localStorage.getItem('user');
      //   let userId=user && JSON.parse(user).;
      // }
    });


    //To update cart number after reloading this code is
    let user = localStorage.getItem('user');
    if (user) {
      let userId = JSON.parse(user).id;
      let cartListPromise = new Promise((resolve, reject) => {
        this.productService.cartList(userId).subscribe({
          next: (result) => { this.productService.cartAllData.emit(result); resolve(result); },
          error: (error) => {
            console.error("Error occurred:", error);
            reject(error);
          }
        });
      });
    } else {
      console.warn("User not found in local storage.");

    }




  }

  // cart(data:product)
  // {
  //   this.userService.addCart(data);
  // }

}
