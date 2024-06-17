import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TipoClienteGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const tipoClientes = this.reflector.getAllAndOverride<number[]>(
      'tipoClientes',
      [context.getClass(), context.getHandler()],
    );
    if (!tipoClientes.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    return tipoClientes.includes(request.user?.role?.id);
  }
}
