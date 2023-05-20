import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './helpers';



const routes: Routes = [
   { path: '', component: HomeComponent , canActivate: [AuthGuardService]},
    //{ path: 'account', loadChildren: AccountModule },
    {path: 'account', loadChildren : () => import('./features/account/account.module').then(m => m.AccountModule) },
    {path: 'user', loadChildren : () => import('./features/user/user.module').then(m => m.UserModule), canActivate: [AuthGuardService] },
    
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



