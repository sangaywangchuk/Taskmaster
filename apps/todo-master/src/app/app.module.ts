import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, RouterModule.forRoot([])],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
