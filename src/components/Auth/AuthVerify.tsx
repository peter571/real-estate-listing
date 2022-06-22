/**Check if token in Valid */

type func = () => void;

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export const authVerify = (func: func) => {

    const user = JSON.parse(localStorage.getItem("realtor")!);
    if (user) {
      const decodedJwt = parseJwt(user.token);
      
      if (decodedJwt.exp * 1000 < Date.now()) {
        func();
        return false;
      } else {
        return true;
      }
    } else {
        return false;
    }
}
