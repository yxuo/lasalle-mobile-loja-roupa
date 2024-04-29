import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFornecedorComponent } from './insert-fornecedor.component';

describe('InsertFornecedorComponent', () => {
  let component: InsertFornecedorComponent;
  let fixture: ComponentFixture<InsertFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertFornecedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
