import { Component } from '@angular/core';
import * as $ from "jquery";
import { AuthenticationService } from './services/authentication.service';
import { User } from './models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wlmt.bungalows.webBO';
  public user: User | undefined;

  constructor(private authService: AuthenticationService, private router: Router,){

   
    
    this.authService.user.subscribe(currentUser => {
      if(currentUser)
        this.user = currentUser;
      else{
        this.user = undefined;
        this.router.navigateByUrl("account/login");
      }
    })
  }

  
}
