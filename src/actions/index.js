// Coloque aqui suas actions
export const USER_INFO = 'USER_INFO';
export const CURRENCY_INFO = 'CURRENCY_INFO';
export const DELETE_INFO = 'DELETE_INFO';
export const EDIT_INFO = 'EDIT_INFO';
export const ACTION_EDIT = 'ACTION_EDIT';

export const userInfo = (payload) => ({ type: USER_INFO, payload });
export const currencyInfo = (payload) => ({ type: CURRENCY_INFO, payload });
export const deleteState = (payload) => ({ type: DELETE_INFO, payload });
export const editState = (payload) => ({ type: EDIT_INFO, payload });
export const editActionState = (payload) => ({ type: ACTION_EDIT, payload });
