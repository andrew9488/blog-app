import axiosApiInstance from "../api";
import { AuthFormDataType } from "../../helpers";

const usersApi = {
  login(data: AuthFormDataType) {
    return axiosApiInstance.post("/users/login", data).then((res) => res.data);
  },
  register(data: AuthFormDataType) {
    return axiosApiInstance
      .post("/users/register", data)
      .then((res) => res.data);
  },
  authMe() {
    return axiosApiInstance.get("/users/me").then((res) => res.data);
  },
};

export default usersApi;
