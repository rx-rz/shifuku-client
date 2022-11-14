export const useLogout = () => {
 
   /**logout function that removes user
    object from local storage and returns to 
    the homepage
    */
   const logout = () => {
    localStorage.removeItem("user");
    window.location.pathname = "/";
  };
  return { logout };
};
