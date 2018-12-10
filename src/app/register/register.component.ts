import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../utils/MyErrorStateMatcher';
import {UsernameValidator} from '../utils/UsernameValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  private mode:number=0;

  constructor(private authService:AuthenticationService,
              private router:Router,
              private formBuilder: FormBuilder,
              private usernameValidator: UsernameValidator) {

  }

  ngOnInit() {
    if (this.authService.isUser())
      this.router.navigateByUrl("/shops")
    this.initForm()
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      username:["",[Validators.required,Validators.email],this.usernameValidator.validate.bind(this.usernameValidator)],
      password:["",Validators.required],
      repeatedPassword:["",[Validators.required,
        matchOtherValidator('password')]]
    },{validators: this.checkPasswords })
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  isInvalidAndDirty(field: string) {
    const ctrl = this.userForm.get(field);
    return !ctrl.valid && ctrl.dirty;
  }

  hasError(field: string, error: string) {
    const ctrl = this.userForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  onRegister(){
    this.authService.register(this.userForm.value)
      .subscribe(
        resp=>{
          this.mode=2
        },
        error1 => {
          this.mode=1;
        }
      )
  }

}
