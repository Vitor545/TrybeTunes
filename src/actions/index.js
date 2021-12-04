// Coloque aqui suas actions
export const USER_INFO = 'USER_INFO';
export const CURRENCY_INFO = 'CURRENCY_INFO';

export const userInfo = (payload) => ({ type: USER_INFO, payload });
export const currencyInfo = (payload) => ({ type: CURRENCY_INFO, payload });
