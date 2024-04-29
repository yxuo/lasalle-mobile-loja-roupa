import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ProductsComponent } from './components/products/products.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { InsertProductsComponent } from './components/insert-products/insert-products.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: '/products/all', pathMatch: 'full' },
  { path: 'signIn', component: SigninComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'products/all', component: ProductsComponent },
  { path: 'products/insert', component: InsertProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
