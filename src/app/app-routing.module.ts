import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ProductsComponent } from './components/products/products.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { InsertProductsComponent } from './components/insert-products/insert-products.component';
import { InsertFornecedorComponent } from './components/insert-fornecedor/insert-fornecedor.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'signIn', component: SigninComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/insert', component: InsertProductsComponent },
  { path: 'supplier/insert', component: InsertFornecedorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
