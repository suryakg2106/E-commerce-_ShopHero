// AuthService.js
import Api from "./Api";

export const Login = async ({ email, password }) => {
  const res = await Api.post(
    "/login",
    { email, password },
    { withCredentials: true }
  );
  return res.data; // { success, user }
};

export const Register = async (cred) => {
  const res = await Api.post("/register", cred, { withCredentials: true });
  return res.data;
};

export const Logout = async () => {
  await Api.get("/logout", { withCredentials: true });
};

export const AuthMe = async () => {
  const res = await Api.get("/me", { withCredentials: true });
  return res.data;
};
