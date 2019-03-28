import { NgModule } from '@angular/core';
import { AccountComponent } from './widgets/account/account.component';

@NgModule({
  declarations: [AccountComponent],
  exports: [AccountComponent]
})
export class AdminModule {}
