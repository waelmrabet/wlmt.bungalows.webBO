import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: User | null;

  constructor(private accountService: AuthenticationService) {
      this.user = this.accountService.userValue;
  }
}


