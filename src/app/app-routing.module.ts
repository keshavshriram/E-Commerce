import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { guardSellerAuthGuard } from './guard-seller-auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'seller-auth',
    component:SellerAuthComponent
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[guardSellerAuthGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent
  },
  {
    path:'seller-update-product/:id',
    component:SellerUpdateProductComponent
  },
  {
    path:'search/:querry',
    component:SearchComponent
  },
  {
    path:'product/:productId',
    component:ProductDetailsComponent
  },
  {
    path:'user-auth',
    component:UserAuthComponent
  },
  {
    path:'cart-page',
    component:CartPageComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'my-orders',
    component:MyOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
