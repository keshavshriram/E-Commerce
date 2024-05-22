import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from 'src/data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuType: string = 'default';
  sellerName: string = "";
  userName: string = "";
  searchResult: undefined | product[];
  searchIns: undefined | string;
  cartItems = 0;
  constructor(private route: Router, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.log("In seller area");
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStorage = localStorage.getItem('seller');
            let sellerData = sellerStorage && JSON.parse(sellerStorage);
            console.log("seller name data is :",sellerData);
            this.sellerName = sellerData[0].uname;
          }

        }
        else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          let userStorage = localStorage.getItem('user');
          let userData = userStorage && JSON.parse(userStorage);
          // console.log(userData);
          this.userName = userData.name;

          // console.log("Cart Items:",this.productService.cartLength(userData.id));
          //console.log("Cart Items Are:",this.lengthOfCart(userData.id));
          // console.log('userData is',userData);



          //getting data from localStroge when user logged in
          // let dataFromLocalStorage=localStorage.getItem('localCart');
          // let parsedData=dataFromLocalStorage && JSON.parse(dataFromLocalStorage);
          // for(let item of parsedData)
          // {
          //   const itemn: cart={
          //     ...item,
          //     userId:userData.id,
          //     productId:item.id
          //   }
          //   console.log(itemn);
          //   this.productService.addCart(itemn).subscribe((result)=>console.log(result));
          // }
        }
        else {
          // console.log("Outside the seller");
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    this.productService.cartAllData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  logOutSeller(): void {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  logOutUser(): void {
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
    this.productService.cartAllData.emit([]);
  }

  searchProduct(querry: KeyboardEvent) {
    if (querry) {
      const element = querry.target as HTMLInputElement;
      // console.log(element.value);
      this.productService.searchProducts(element.value).subscribe((result) => {
        console.log(result);
        this.searchResult = result;
      });
    }
  }

  insertSearch(data: string) {
    // console.log(data);
    this.searchIns = data;
  }

  unrenderComponent() {
    setTimeout(() => { this.searchResult = undefined }, 400);
  }

  searchButton(data: string) {
    console.log(data);
    this.route.navigate([`search/${data}`]);
    // this.productService.searchButt(data).subscribe((result)=>{
    //   console.log(result);

    // });    //commented because this should write in search file

  }
  

  // lengthOfCart(id:string)
  // {
  //   return this.productService.cartLength(id).forEach((item)=>console.log(item));
  // }

  

}
