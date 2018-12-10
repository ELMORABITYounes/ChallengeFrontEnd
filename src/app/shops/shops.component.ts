import {Component, OnInit} from '@angular/core';
import {ShopService} from '../services/shop.service';
import {Shop} from '../models/Shop';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  shops: Array<Shop> = [];
  likedShops: Array<string> = [];
  error: any = null;
  loading:number=1

  constructor(private shopService: ShopService, public authService: AuthenticationService) {
  }

  ngOnInit() {
    this.getLocation()
  }

  getLocation() {
    if (window.navigator && window.navigator.geolocation) {
       window.navigator.geolocation.getCurrentPosition(
        position => {
          this.locationSuccessHandler(position);
        },
        error => {
          switch (error.code) {
            case 1:
              this.error = 'Couldn\'t get your location Permission Denied';
              break;
            default:
              this.error = 'Location Unavailable Please Check Your Connexion!';
              break;
          }
        }
      );
    }
  }

  locationSuccessHandler(position){
    this.shopService.getLikedShops(this.authService.getUsername()).subscribe(resp => {
      let tmp:any=resp;
      for (let likedShop of tmp) {
        this.likedShops.push(likedShop.reference);
      }
      this.getNearbyShops(position.coords.latitude, position.coords.longitude);
    }, error1 => {
      this.error = 'an error has occurred please check your connection';
    });
  }

  public getNearbyShops(latitude, longitude) {
    this.shopService.getShops(latitude, longitude)
      .subscribe(resp => {
          this.loading=0
          let tmp: any = resp;
          for (let item of tmp.response.groups[0].items) {
            if (this.likedShops.indexOf(item.venue.id)==-1) {
              let theShop = new Shop(item.venue.id, item.venue.name, item.venue.location.distance);
              this.shopService.setShopImage(theShop);
              this.shops.push(theShop);
            }
          }
          this.shops.sort((a,b) => a.distance - b.distance);
          console.log(this.shops)
        },
        error1 => (
          this.error = 'an error has occurred please check your connection'
        )
      );
  }

  onLike(reference,index){
    console.log(index)
    console.log(reference)
    this.shopService.likeShope(reference,this.authService.getUsername()).subscribe(
      resp=>{
        this.shops.splice(index ,1)
      },error1 =>{
        alert("an error has occurred please check your connection")
      }
    )
  }

}
