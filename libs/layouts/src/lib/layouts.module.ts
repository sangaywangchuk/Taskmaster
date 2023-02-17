import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AuthLayoutComponent, UserLayoutComponent],
  exports: [],
})
export class LayoutsModule {}
