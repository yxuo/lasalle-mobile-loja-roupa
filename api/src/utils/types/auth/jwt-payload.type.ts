import { Cliente } from 'src/cliente/cliente.entity';

export type JwtPayloadType = Pick<Cliente, 'id' | 'role'> & {
  iat: number;
  exp: number;
};
