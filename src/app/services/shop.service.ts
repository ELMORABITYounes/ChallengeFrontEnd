import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Shop} from '../models/Shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private SERVER:String="http://localhost:8080";

  constructor(private http:HttpClient) { }

  getShops(latitude,longitude){
    return this.http.get(/*"https://api.foursquare.com/v2/venues/explore?client_id=KLKN1DVXEAELYWHQI4R3DMJPNEJSMCBLS4IB2TLRAEQU4LWA&client_secret=3UQUZWP24JL1JHU2L0LU5OLUNM31SPGV3Q1VATK0GAC2REMF&ll="+latitude+","+longitude+"&section=shops&sortByDistance=true&v=20181207&radius=5000"*/"https://api.foursquare.com/v2/venues/explore?client_id=KLKN1DVXEAELYWHQI4R3DMJPNEJSMCBLS4IB2TLRAEQU4LWA&client_secret=3UQUZWP24JL1JHU2L0LU5OLUNM31SPGV3Q1VATK0GAC2REMF&ll=32.89452,-6.92052&section=shops&sortByDistance=true&v=20181207&radius=5000")
  }

  likeShope(reference,username){
    let payload={"username":username,"reference":reference};
    console.log(payload)
    return this.http.post(this.SERVER+"/likedShops",payload);
  }

  setShopImage(shop:Shop){
    return this.http.get("https://api.foursquare.com/v2/venues/"+shop.id+"/photos?client_id=KLKN1DVXEAELYWHQI4R3DMJPNEJSMCBLS4IB2TLRAEQU4LWA&client_secret=3UQUZWP24JL1JHU2L0LU5OLUNM31SPGV3Q1VATK0GAC2REMF&v=20181130")
      .subscribe(resp=>{
        let tmp:any=resp;
        console.log(tmp.response.photos)
        if (tmp.response.photos.items[0])
        shop.imageUrl=tmp.response.photos.items[0].prefix+"300x500"+tmp.response.photos.items[0].suffix;
      })
  }

  getShopDetails(id){
    return this.http.get("https://api.foursquare.com/v2/venues/"+id+"?client_id=KLKN1DVXEAELYWHQI4R3DMJPNEJSMCBLS4IB2TLRAEQU4LWA&client_secret=3UQUZWP24JL1JHU2L0LU5OLUNM31SPGV3Q1VATK0GAC2REMF&v=20181130");
  }

  getLikedShops(username:string){
    return this.http.get(this.SERVER+"/likedShops?username="+username);

  }

  removeLikedShope(reference){
    return this.http.delete(this.SERVER+"/likedShops?username="+reference);
  }
}
