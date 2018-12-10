import { Component } from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChallengeFrontEnd';

  constructor(public authService:AuthenticationService,public router:Router){
  }

  onLogout(){
    this.authService.logout()
    this.router.navigateByUrl("/login")
  }
}
