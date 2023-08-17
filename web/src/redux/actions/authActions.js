const LOG_IN = "LOG_IN";
const CHECK_LOGED_IN = "CHECK_LOGED_IN";
const LOG_OUT = "LOG_OUT";
const REGISTER = "REGISTER";

const logInAction = (userAccount) => {
  return {
    type: LOG_IN,
    userAccount,
  };
};

const logedInAction = (userToken) => {
  return {
    type: CHECK_LOGED_IN,
    userToken,
  };
};

const logOutAction = () => {
  return {
    type: LOG_OUT,
  };
};

const registerAction = (userInfo) => {
  return {
    type: REGISTER,
    userInfo,
  };
};

export {
  LOG_IN,
  CHECK_LOGED_IN,
  REGISTER,
  LOG_OUT,
  logInAction,
  logedInAction,
  logOutAction,
  registerAction,
};
