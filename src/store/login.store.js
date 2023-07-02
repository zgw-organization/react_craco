import { getToken, setToken, clearToken, http } from "@/utils";
import { makeAutoObservable, runInAction } from "mobx";

class LoginStore {

  token = getToken() || "";

  constructor () {
    // makeAutoObservable数据响应式  observer() 包裹组件页面响应式
    makeAutoObservable(this);
    // 注册计算属性  可写可不写
    // makeAutoObservable(this, {
    //   a: computed
    // })
  }

  // 登录获取token
  login = async({mobile, code}) => {
    const res = await http.post(
      "/authorizations",
      {
        mobile,
        code
      }
    );
    runInAction(() => {
      this.token = res.data.token;
    });
    setToken(res.data.token);
  }

  // 计算属性 类型与vuex中的getters
  get a() {
    return '123'
  }

  //登出
  logout = () => {
    this.token = '';
    clearToken();
  }
}

export default LoginStore;