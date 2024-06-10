import { Cliente } from "src/cliente/cliente.entity";

export type LoginResponseType = Readonly<{
  token: string;
  user: Cliente;
}>;
