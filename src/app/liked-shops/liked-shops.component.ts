import { Component, OnInit } from '@angular/core';
import {Shop} from '../models/Shop';
import {ShopService} from '../services/shop.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-liked-shops',
  templateUrl: './liked-shops.component.html',
  styleUrls: ['./liked-shops.component.css']
})
export class LikedShopsComponent implements OnInit {

  likedShops: Array<Shop> = [];
  error: any = null;
  loading:number=1

  constructor(private shopService: ShopService, public authService: AuthenticationService) {
  }

  ngOnInit() {
    this.shopService.getLikedShops(this.authService.getUsername()).subscribe(resp => {
      let tmp:any=resp;
      this.loading=0
      for (let likedShop of tmp) {
        this.shopService.getShopDetails(likedShop.reference).subscribe(
          resp=>{
            let item:any=resp
            let theShop = new Shop(item.response.venue.id, item.response.venue.id.name, 0);
            this.shopService.setShopImage(theShop);
            this.likedShops.push(theShop);
          },
          error1 =>{
            this.error = 'an error has occurred please check your connection'
          }
      )
      }

    }, error1 => {
      this.error = 'an error has occurred please check your connection';
    });
  }

  onRemove(reference,index){
    this.shopService.removeLikedShope(reference).subscribe(
      resp=>{
        this.likedShops.splice(index ,1)
      },error1 =>{
        alert("an error has occurred please check your connection")
      }
    )
  }

}
