import { Component } from '@angular/core';
import * as $ from "jquery";
import { AccountService } from './services/account.service';
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

  constructor(private accountService: AccountService, private router: Router,){
    
    this.accountService.user.subscribe(currentUser => {
      if(currentUser)
        this.user = currentUser;
      else{
        this.user = undefined;
        this.router.navigateByUrl("account/login");
      }
    })
  }
}
