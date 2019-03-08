import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule],
  exports: [AccountComponent]
})
export class AuthModule {}
