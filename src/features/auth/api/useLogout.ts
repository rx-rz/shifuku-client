export const useLogout = () => {
 const logout = () => {
    localStorage.removeItem("user")
    window.location.pathname = "/"
 }
 return {logout}
}