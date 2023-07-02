const TOKEN_KEY = "geek_pc";

const getToken = () => sessionStorage.getItem(TOKEN_KEY)
const setToken = token => sessionStorage.setItem(TOKEN_KEY, token)
const clearToken = () => sessionStorage.removeItem(TOKEN_KEY)

export { 
  getToken, 
  setToken, 
  clearToken
}