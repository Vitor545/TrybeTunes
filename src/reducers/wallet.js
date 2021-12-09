// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_INFO, DELETE_INFO, EDIT_INFO, ACTION_EDIT } from '../actions';

const WALLET_STATE = {
  expenses: [],
  editId: '',
  renderizaEditar: false,
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
  case EDIT_INFO:
    return { ...state,
      editId: action.payload,
      renderizaEditar: true,
    };
  case ACTION_EDIT:
    return { ...state,
      expenses: action.payload,
      editId: '',
      renderizaEditar: false,
    };
  default: return state;
  }
};

export default userReducer;
