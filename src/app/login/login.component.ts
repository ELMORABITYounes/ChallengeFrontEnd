import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../utils/MyErrorStateMatcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  private mode:number=0;

  constructor(private authService:AuthenticationService,
              private router:Router,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    if (this.authService.isUser())
      this.router.navigateByUrl("/shops")
    this.initForm()
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })
  }

  isInvalidAndDirty(field: string) {
    const ctrl = this.userForm.get(field);
    return !ctrl.valid && ctrl.dirty;
  }

  hasError(field: string, error: string) {
    const ctrl = this.userForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  onLogin(){
    this.authService.login(this.userForm.value)
      .subscribe(
        resp=>{
          let jwt=resp.headers.get("authorization")
          //console.log(jwt)
          this.authService.saveToken(jwt);
          this.router.navigateByUrl("/shops")
        },
        error1 => {
          this.mode=1;
        }
      )
  }

}
