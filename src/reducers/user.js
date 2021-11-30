// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_INFO } from '../actions';

const USER_STATE = {
  email: '',
};

const userReducer = (state = USER_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    return { ...state,
      email: action.payload,
    };
  default: return state;
  }
};

export default userReducer;
