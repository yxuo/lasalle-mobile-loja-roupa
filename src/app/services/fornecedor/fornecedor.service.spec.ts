import { TestBed } from '@angular/core/testing';

import { FornecedorService } from './fornecedor.service';

describe('ProductsService', () => {
  let service: FornecedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornecedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
