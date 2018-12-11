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
  dislikedShops: Array<any> = [];
  error: any = null;
  loading:number=1;

  constructor(private shopService: ShopService, public authService: AuthenticationService) {
  }

  ngOnInit() {
    if (ShopService.position==null){
      this.getLocation()
    } else
      this.locationSuccessHandler(ShopService.position)

  }

  getLocation() {
    if (window.navigator && window.navigator.geolocation) {
       window.navigator.geolocation.getCurrentPosition(
        position => {
          console.log("position catlculated")
          this.locationSuccessHandler(position);
          ShopService.position=position
        },
        error => {
          switch (error.code) {
            case 1:
              this.error = 'Couldn\'t get your location Permission Denied';
              break;
            default:
              this.error = 'Location Unavailable Please Check Your internet connexion!';
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
      this.shopService.getDislikedShops(this.authService.getUsername()).subscribe(resp => {
        let tmp:any=resp;
        for (let dislikedShop of tmp) {
          this.dislikedShops.push({reference:dislikedShop.reference,date:dislikedShop.date});
        }
        this.getNearbyShops(position.coords.latitude, position.coords.longitude);
      }, error1 => {
        this.error = 'an error has occurred please check your internet connexion';
      });
    }, error1 => {
      this.error = 'an error has occurred please check your internet connexion';
    });
  }

  public getNearbyShops(latitude, longitude) {
    this.shopService.getShops(latitude, longitude)
      .subscribe(resp => {
          this.loading=0
          let tmp: any = resp;
          for (let item of tmp.response.groups[0].items) {
            if (this.likedShops.indexOf(item.venue.id)==-1 ) {
              let dislikedIndex=this.isDisliked(item.venue.id);
              if(dislikedIndex != -1){
                if (!this.differenceSmallerThanTwo(this.dislikedShops[dislikedIndex].date))
                {
                  let theShop = new Shop(item.venue.id, item.venue.name, item.venue.location.distance);
                  this.shopService.setShopImage(theShop);
                  this.shops.push(theShop);
                  this.shopService.removeDislikedShop(theShop.id).subscribe(
                    resp=>{
                    },error1 =>{
                      alert("an error has occurred please check your connection")
                    })
                }
              }else {
                let theShop = new Shop(item.venue.id, item.venue.name, item.venue.location.distance);
                this.shopService.setShopImage(theShop);
                this.shops.push(theShop);
              }
            }
          }
          this.shops.sort((a,b) => a.distance - b.distance);
        },
        error1 => (
          this.error = 'an error has occurred please check your internet connexion'
        )
      );
  }

  onLike(reference,index){
    this.shopService.likeShope(reference,this.authService.getUsername()).subscribe(
      resp=>{
        this.shops.splice(index ,1)
      },error1 =>{
        alert("an error has occurred please check your internet connexion")
      }
    )
  }

  onDisLike(reference,index){
    this.shopService.dislikeShop(reference).subscribe(
      resp=>{
        this.shops.splice(index ,1)
      },error1 =>{
        alert("an error has occurred please check your internet connexion")
      }
    )
  }
  
  isDisliked(reference){
    let length=this.dislikedShops.length;
    for(let i=0;i<length;i++) {
      if (this.dislikedShops[i].reference==reference)
        return i
    }
    return -1
  }
  
  differenceSmallerThanTwo(date){
    let dateNow=new Date();
    var dislikedDate = new Date(date);
    let diffInHours=(dateNow.getTime() - dislikedDate.getTime())/ 1000 / 60 / 60;
    if (Math.ceil(diffInHours)>2){
      return false;
    } else
      return true;
  }

}
