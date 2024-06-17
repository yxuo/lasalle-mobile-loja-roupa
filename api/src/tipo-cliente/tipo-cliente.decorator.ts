import { SetMetadata } from '@nestjs/common';

export const TipoCliente = (...tipoClientes: number[]) =>
  SetMetadata('tipoClientes', tipoClientes);
