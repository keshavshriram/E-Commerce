import { CanActivateFn, Router } from '@angular/router';
// let obj;
// class xyz
// {
// constructor(public router:Router)
// {
//   obj=router;

// }

// }
export const guardSellerAuthGuard: CanActivateFn = (route, state) => {
  
  return true;
};

// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot,CanActivate,RouterStateSnapshot,UrlTree } from "@angular/router";
// import { Observable } from "rxjs";


// @Injectable({
//     providedIn:'root'
//   })


// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//     throw new Error("Method not implemented.");
//   }

  
// export class guardSellerAuthGuard implements CanActivate
  


