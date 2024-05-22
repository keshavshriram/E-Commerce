import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/data-type';
// import { OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
 productList: undefined | product[];
 noProductMessage:number=0;
  constructor( private productService:ProductService , private activateRoute:ActivatedRoute)
  {
   
  }


  ngOnInit()
  {
    const searched=this.activateRoute.snapshot.paramMap.get('querry');
    searched && this.productService.searchProducts(searched).subscribe((result)=>{
      
      this.productList=result;
      console.log(this.productList.length)
       this.noProductMessage=this.productList.length;

    });
    //  if(this.productList && this.productList.length==0)
    //  {
    //   this.noProductMessage="No Product Found";
    //  }

    // this.productService.searchButt(data).subscribe((result)=>{
    //   console.log(result);
      
    // });
  }

}
