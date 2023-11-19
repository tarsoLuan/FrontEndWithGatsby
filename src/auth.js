export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : {}
    


export const handleLogin = ( user ) => {
  console.log('user', user);
  window.localStorage.setItem("user", JSON.stringify(user))
  console.log(window.localStorage.getItem("user"));
}
