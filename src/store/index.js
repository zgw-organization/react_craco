import React from "react";
import LoginStore from './login.store';
import UserStore from './user.store';

class RootStore {

  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
  }
}

const StoresContext = React.createContext(new RootStore());
export const useStore = () => React.useContext(StoresContext);