import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignIn, SignUp } from 'src/data-type';
import { BehaviorSubject, observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn=new BehaviorSubject<boolean>(false);
  isLogInError=new EventEmitter<boolean>(false);

  constructor(private http:HttpClient , private router:Router) { }

  userSignUp(data:SignUp)
  {
    return this.http.post('http://localhost:3000/seller',
    data,
    {observe:'response'}
    ).subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      console.log('Result is :',result);
    });

  }
  //
  userSignIn(data:SignIn)
  {
    console.log(data);
    this.http.get(`http://localhost:3000/seller?uemail=${data.uemail}&upass=${data.upass}`,{observe:'response'}).subscribe((result:any)=>{
      console.log(result);
      if(result && result.body && result.body.length )
      {
        console.log("User Logged In");
        this.router.navigate(['seller-home']);
        localStorage.setItem('seller',JSON.stringify(result.body));
      }

      else
      {
        console.log("Acess Denied");
        this.isLogInError.emit(true);
      }
    });
  }

  reloadSeller()
  {
    if(localStorage.getItem('seller'))
    {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
