import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignIn, SignUp } from 'src/data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  authError:string="";

  constructor(private seller:SellerService,private router:Router)
  {}

  ngOnInit():void
  {
    this.seller.reloadSeller();
  }


  signUp(data:SignUp):void
  {
    
    this.seller.userSignUp(data)
  }
  display=true;
  changeWindow() 
  {
    this.display=!this.display;
    // return this.display;
  }

  signIn(data:SignIn):void 
  {
    this.authError="";
    this.seller.userSignIn(data);

    this.seller.isLogInError.subscribe((isError)=>{
      if(isError)
      {
        this.authError="Please Enter Valid Email or Password";
      }
    })
  }
}


// .subscribe((result)=>{
//       console.log(result);

//       if(result)
//       {
//         this.router.navigate(['seller-home']);
//       }
//     });


