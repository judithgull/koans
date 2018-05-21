import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <h1 class="logo">
       <a routerLink="/">
           <span>Logo</span>
        </a>
    </h1>
  `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
}
