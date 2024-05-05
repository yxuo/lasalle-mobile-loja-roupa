import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ProductsComponent } from './components/products/products.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { InsertProductsComponent } from './components/insert-products/insert-products.component';
import { InsertFornecedorComponent } from './components/insert-fornecedor/insert-fornecedor.component';
import { FornecedorComponent } from './components/fornecedor/fornecedor.component';
import { RoleGuardService } from './services/auth/role-guard.service';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'signIn', component: SigninComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'products/insert',
    component: InsertProductsComponent,
    canActivate: [RoleGuardService],
    data: { expectedRoles: ['funcionario'] },
  },
  {
    path: 'supplier',
    component: FornecedorComponent,
    canActivate: [RoleGuardService],
    data: { expectedRoles: ['funcionario', 'gerente'] },
  },
  {
    path: 'supplier/insert',
    component: InsertFornecedorComponent,
    canActivate: [RoleGuardService],
    data: { expectedRoles: ['funcionario', 'gerente'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
