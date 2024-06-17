import { config } from 'dotenv';
config();

export const APP_URL = `http://localhost:${process.env.APP_PORT}`;
export const MAILDEV_URL = `http://${process.env.MAIL_HOST}:${process.env.MAIL_CLIENT_PORT}`;

export const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL || 'admin@example.com';
export const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || 'secret';
export const ADMIN_2_EMAIL = 'admin2@example.com';
export const ADMIN_2_PASSWORD = 'secret';

export const TO_UPDATE_PERMIT_CODE = '319274392832025';

export const LICENSEE_CPF_EMAIL = 'henrique@example.com';
export const LICENSEE_CPF_PERMIT_CODE = '213890329890312';
export const LICENSEE_CPF_PASSWORD = 'secret';

export const LICENSEE_TEST_EMAIL = 'user@example.com';
export const LICENSEE_TEST_PERMIT_CODE = '213890329890749';
export const LICENSEE_CASE_ACCENT = 'Usuário Teste dos Santos Oliveira';

export const LICENSEE_CNPJ_EMAIL = 'marcia@example.com';
export const LICENSEE_CNPJ_PERMIT_CODE = '319274392832023';
export const LICENSEE_CNPJ_PASSWORD = 'secret';

export const LICENSEE_REGISTERED_EMAIL = 'registered.user@example.com';
export const LICENSEE_USED_EMAIL = 'used.user@example.com';
export const LICENSEE_SENT_EMAIL = 'sent.user@example.com';
export const LICENSEE_QUEUED_EMAIL = 'queued.user@example.com';

export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_CLIENT_PORT;

