import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
   { path: '', component: HomeComponent },
    //{ path: 'account', loadChildren: AccountModule },
    {path: 'account', loadChildren : () => import('./features/account/account.module').then(m => m.AccountModule) },
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



