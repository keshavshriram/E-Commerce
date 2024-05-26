import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignUp, product, userSignIn } from 'src/data-type';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLogIn = new EventEmitter<boolean>();
  apiUrl:string="https://ecommerce-backend-deployed.vercel.app";

  constructor(private http: HttpClient, private router: Router) {

  }

  postUser(user: UserSignUp) {
    return this.http.post(this.apiUrl+'/user', user, { observe: 'response' }).subscribe((result) => {
      console.log(result);

      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);

      }
    });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  userSignIn(user: userSignIn) {
    // console.log(user);

    let userStatusPromise = new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+`/user?email=${user.email}&pass=${user.pass}`)
        .subscribe({
          next: (result: any) => {
            // console.log("Value to match , from database:", result);
            if (result[0]) {
              console.log("User Logged In");
              localStorage.setItem('user', JSON.stringify(result[0]));
              this.router.navigate(['/']);
              this.isUserLogIn.emit(false);
              resolve(result); // Resolve the Promise with the result
            } else {
              console.log("Not Logged In Successfully");
              this.isUserLogIn.emit(true);
              reject("User not found"); // Reject the Promise with an error message
            }
          }
        });
    });

    userStatusPromise
      .then((result: any) => {
        // Handle the result if resolved
        console.log("Promise resolved with result:", result);
      })
      .catch(error => {
        // Handle the error if rejected
        console.log("Promise rejected with error:", error);
      });


  }



  // addCart(data:product)
  // {
  //   console.log('data is ',data);
  //   this.http.post('http://localhost:3000/cart',data,{observe:'response'}).subscribe((result)=>{
  //     console.log("Post Subscribe Result Is ",result);
  //   });
  // }
}
