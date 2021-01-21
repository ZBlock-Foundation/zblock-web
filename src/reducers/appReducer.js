import actions from "../actions";

const appInitialState = {
  walletConnected: Boolean(localStorage.getItem("walletAddress")),
  flashMessages: [],
  user: {
    ethAddress: localStorage.getItem("walletAddress"),
    username: localStorage.getItem("username"),
  },
};

const appReducer = (state, action) => {
  switch (action.type) {
    case actions.WALLET_CONNECTED:
      state.walletConnected = true;
      state.user.ethAddress = action.value;
      break;
    case actions.FLASH_MESSAGES:
      state.flashMessages.push(action.value);
      break;
    default:
      return;
  }
};

export { appInitialState, appReducer };
