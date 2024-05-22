import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from 'src/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartAllData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    // console.log("Product service called");
    let seller=localStorage.getItem('seller');
    let sellerId= seller && JSON.parse(seller)[0].id;
    data.sellerId=sellerId;

    
    return this.http.post("http://localhost:3000/products", data)
  }

  productList(sellerId:number) {
    return this.http.get<product[]>(`http://localhost:3000/products?sellerId=${sellerId}`);
  }

  deleteFun(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  updateFun(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  setUpdate(data: product) {
    return this.http.put<product>(`http://localhost:3000/products/${data.id}`, data)
  }

  productListHome() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  searchProducts(querry: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${querry}`);
  }

  productDetails(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  localStorageCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');

    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      cartData.push(data);
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    // cartData = localCart && JSON.parse(localCart);
    // cartData.push(data);
    // localStorage.setItem('localCart', JSON.stringify(cartData));

    this.cartAllData.emit(cartData);
  }

  removeItemFromCart(id: number) {

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      // console.log(items);
      items = items.filter((item: product) => id !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartAllData.emit(items);
    }
    // let allData=localStorage.getItem('localCart');
    // let cartElements:product[]= allData && JSON.parse(allData);


  }

  addCart(cartData: cart) {
    console.log("Cart Data is:", cartData);
    return this.http.post('http://localhost:3000/cart', cartData);

  }

  cartList(id: string) {
    // console.log("ID recieved at product service is :",id);

    // this.productService.cartAllData.emit(result);  <= this line not emitted here because to emit this line i should 
    // subscribe get method but after subcsription we cannot angain subscribe cartList method in user-auth-componenet file 
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=${id}`);
  }

  removeToCart(cartId:number)
  {
    return this.http.delete("http://localhost:3000/cart/"+cartId);
  }

  cartElements(userId:string)
  {
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userId}`);
  }

  orderNow(data:order)
  {
    return this.http.post("http://localhost:3000/orders",data);
  }

  orderList()
  {
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;
    return this.http.get<order[]>(`http://localhost:3000/orders?userId=${userId}`);
  }

  deleteCartItems(cartId:number)
  {
    return this.http.delete("http://localhost:3000/cart/"+cartId,{observe:'response'}).subscribe((result)=>{
      if(result)
      {
        this.cartAllData.emit([]);
      }
    })
  }

  cancelOrder(orderId:number | undefined)
  {
    return this.http.delete("http://localhost:3000/orders/"+orderId);
  }



  // searchButt(data:string)
  // {
  //   return this.http.get<product>(`http://localhost:3000/products?pname=${data}`);
  // }



}
