import { config } from 'dotenv';
config();

export const APP_URL = `http://localhost:${process.env.APP_PORT}`;

export const ADMIN_EMAIL = 'admin@example.com';
export const ADMIN_PASSWORD = 'secret';

export const CLIENTE_EMAIL = 'cliente@example.com';
export const CLIENTE_PASSWORD = 'secret';

export const FUNCIONARIO_EMAIL = 'funcionario@example.com';
export const FUNCIONARIO_PASSWORD = 'secret';

export const GERENTE_EMAIL = 'gerente@example.com';
export const GERENTE_PASSWORD = 'secret';
