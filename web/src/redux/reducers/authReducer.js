import {
  CHECK_LOGED_IN,
  LOG_IN,
  LOG_OUT,
  REGISTER,
} from "../actions/authActions";

const initialAuthState = {
  isLogedIn: false,
  user: null,
};

export default function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
      };
    case LOG_OUT:
      return {
        ...state,
      };
    case CHECK_LOGED_IN:
      return {
        ...state,
      };
    case REGISTER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
