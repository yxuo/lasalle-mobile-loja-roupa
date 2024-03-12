import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ProductsComponent } from './views/products/components/products/products.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '',   redirectTo: '/products/all', pathMatch: 'full' },
  { path: 'products/all', component: ProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
