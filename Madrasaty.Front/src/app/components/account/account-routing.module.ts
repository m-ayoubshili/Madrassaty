import { ISidebar } from './../../_metronic/layout/core/default-layout.config';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AccountComponent } from './account.component';
import { SettingsComponent } from './settings/settings.component';
import { StripeComponent } from './stripe/stripe.component';
import { AppResolverService } from 'src/app/services/app-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent, 
        resolve:{res:AppResolverService}   
      },
      {
        path: 'settings',
        component: SettingsComponent,
        resolve:{res:AppResolverService}  
      },
      {
        path: 'stripe',
        component: StripeComponent,
      },
      { path: '', redirectTo: 'settings', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AppResolverService]
})
export class AccountRoutingModule {}
