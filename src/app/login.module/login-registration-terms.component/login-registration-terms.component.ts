import { Component } from '@angular/core';
import { cacheKeys } from '../../app.constants';

@Component({
  selector: 'app-login-registration-terms',
  templateUrl: './login-registration-terms.component.html',
  styleUrls: ['./login-registration-terms.component.scss']
})
export class LoginRegistrationTermsComponent {
  public termsOfService: string;
  constructor() {
    this.termsOfService = cacheKeys.termsOfService;
  }
}
