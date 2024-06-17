import { Cliente } from 'src/cliente/cliente.entity';

export type JwtPayloadType = Pick<Cliente, 'id' | 'tipo'> & {
  iat: number;
  exp: number;
};
