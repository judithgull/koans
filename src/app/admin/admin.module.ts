import { NgModule } from '@angular/core';
import { AccountComponent } from './widgets/account/account.component';
import { IntroTextComponent } from './widgets/intro-text/intro-text.component';

@NgModule({
  declarations: [AccountComponent, IntroTextComponent],
  exports: [AccountComponent, IntroTextComponent]
})
export class AdminModule {}
