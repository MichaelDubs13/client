import http from "../services/http-base";

export const checkSession = async (setIsAuthenticated, setUser) => {
    // const response = await BackendService.get("auth/validate-session");
    // console.log({response})
    try {
    const result = await http.get("auth/validate-session").then(async response => await response.json());
    
    console.log({result})
    console.log("checkSession response >> ", result);
    setIsAuthenticated(result.isAuthenticated);
    console.log("checkSession user >> ", result.user);
    setUser(result.user);
  } catch (error) {
    console.error("Error checking session:", error);
    setIsAuthenticated(false);
  }
};
