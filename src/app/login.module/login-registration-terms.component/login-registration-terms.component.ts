import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-login-registration-terms',
  templateUrl: './login-registration-terms.component.html',
  styleUrls: ['./login-registration-terms.component.scss']
})
export class LoginRegistrationTermsComponent {
  public url: SafeResourceUrl;
  constructor(private _sanitizer: DomSanitizer) {
    this.url =
      this._sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/0B1gQDVpy0NOLNnZ1aDRONmhUeUU/view?usp=sharing');
  }
}
