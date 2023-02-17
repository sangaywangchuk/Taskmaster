import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { UserLayoutComponent } from '@lib/layouts';
const routes = [
  {
    path: '',
    redirectTo: '/todo',
    pathMatch: 'full' as const,
  },
  {
    path: 'todo',
    component: UserLayoutComponent,
    loadChildren: () =>
      import('@lib/todo').then((m) => m.TodoModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
})
export class CoreRoutingModule {}
