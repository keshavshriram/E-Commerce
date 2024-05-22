import { Component, EventEmitter } from '@angular/core';
import { SignIn, UserSignUp, userSignIn } from 'src/data-type';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { cart } from 'src/data-type';
import { ProductService } from '../services/product.service';
import { product } from 'src/data-type';



@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  toggleForm: boolean = true;
  usesrSigInError: string = "";


  ngOnInit() {
    this.userService.userAuthReload();
  }
  constructor(private userService: UserService, private router: Router, private productService: ProductService) {

  }

  signUp(user: UserSignUp) {
    // console.log(user);
    this.userService.postUser(user);
  }

  signIn(user: userSignIn) {
    // console.log(user);
    this.userService.userSignIn(user);
    // console.log(this.userService.isUserLogIn);
    // let eventEmmitter_is;
    // this.userService.isUserLogIn.subscribe((result=>console.log(result)));
    setTimeout(() => { console.log("wait for executing userSignIn()") }, 1000);
    this.userService.isUserLogIn.subscribe((result) => {
      // eventEmmitter_is = result; //NOT ABLE TO  HOLD EXACT VALUE OF RESULT
      // console.warn("isUserLogIn is :", result);
      if (result) {
        this.usesrSigInError = "Please Enter Valid Credentials"
        // console.log("if runs")

      }
      else {

        // console.log("userauth Else Run")
        this.localCartToRemoteCart();
      }

    })





    // if(eventEmmitter_is) {
    //   console.log("userauth Else Run")
    //   this.localCartToRemoteCart();

    // }
    // else {

    //   this.usesrSigInError = "Please Enter Valid Credentials"
    //   console.log("if runs")
    // }
  }

  toggleSign() {
    this.toggleForm = !this.toggleForm;
  }

  localCartToRemoteCart() {
    //  getting data from localStroge when user logged in
    let dataFromLocalStorage = localStorage.getItem('localCart');

    let user = localStorage.getItem('user');
    let userData = user && JSON.parse(user);

    if (dataFromLocalStorage) {
      let parsedData:product[]= JSON.parse(dataFromLocalStorage);



      parsedData.forEach ((item:product,index)=> {
        const itemn: cart =
        {
          ...item,
          userId: userData && userData.id,
          productId: item.id
        }

        // console.log(itemn);
        let insertPromise=new Promise((resolved,rejected)=>{
          this.productService.addCart(itemn).subscribe((result) => {
            if (result) {
              console.log("Items Inserted iinto Database from local Storage");
              resolved(result);
            }
            else
            {
              rejected("FAILED INSERT INTO CART");
            }
          });

        });

        insertPromise.
        then((result:any)=>{
          console.log("Inserted into db resolved");
        })
        .catch(error =>{
          console.log("error coccured while inserting into db");
        })

        if(parsedData.length===index+1)
        {
          localStorage.removeItem('localCart');  
        }
          
        
      })
    }

    let db_listPromise = new Promise((resolved,rejected) => {
      this.productService.cartList(userData.id).subscribe((result)=>{
        console.log(result);

      if(result)
      {
        this.productService.cartAllData.emit(result)
        resolved(result);
      }
      else
      {
        rejected("Result not found");
      }
      });
      
    });
    db_listPromise
    .then((result:any)=>{
      console.log("Resolved result is",result);
    })
    .catch(error=>{
      console.log("Promise rejected with errror:",error);
    })
    




  }
}
