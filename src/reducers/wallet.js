// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_INFO, DELETE_INFO } from '../actions';

const WALLET_STATE = {
  expenses: [],
};

const userReducer = (state = WALLET_STATE, action) => {
  switch (action.type) {
  case CURRENCY_INFO:
    return { ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_INFO:
    return { ...state,
      expenses: action.payload,
    };
  default: return state;
  }
};

export default userReducer;
