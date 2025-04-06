// This declaraion is part of the Angular project.
declare var google: any;

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LoginDto } from 'src/app/Services/Auth/Models/LoginDto';
import { UserDto } from 'src/app/Services/Auth/Models/UserDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: "1021269737526-ehrr84a5ffl308kudld700nn6vbrpc8b.apps.googleusercontent.com",
      callback : (response: any) => {
        this.handleGoogleSsoLogin(response);
      }
    })

    google.accounts.id.renderButton(document.getElementById("googleSignIn"), {
      theme: "filled_blue",
      size: "large",
      shape: "rectangular",
      text: "signin_with",
      logo_alignment: "left"
    })
  }

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService){

  }

  login(loginForm:NgForm) {
    console.log(loginForm.value.email)
    let loginDetails = new LoginDto(loginForm.value.email, loginForm.value.password);
    this.authService.loginUser(loginDetails).subscribe(data => {
      console.log(data);
    })
  }

  private decodeJwtToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleGoogleSsoLogin(response:any){
    const payload = this.decodeJwtToken(response.credential);
    sessionStorage.setItem('user', JSON.stringify(payload));
  }

}

