import axiosApiInstance from "../api";
import { AuthFormDataType } from "../../helpers";
import { UserType } from "./../../helpers/types";

const usersApi = {
  login(data: AuthFormDataType) {
    return axiosApiInstance
      .post<{ user: UserType; token: string }>("/users/login", data)
      .then((res) => res.data);
  },
  register(data: AuthFormDataType) {
    return axiosApiInstance
      .post("/users/register", data)
      .then((res) => res.data);
  },
  authMe() {
    return axiosApiInstance
      .get<{ user: UserType; token: string }>("/users/me")
      .then((res) => res.data);
  },
};

export default usersApi;
