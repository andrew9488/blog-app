import { useMutation, useQueryClient } from "react-query";

import usersService from "./users.service";
import { tokenActions } from "../../helpers";

const useUsersAuth = () => {
  const queryClient = useQueryClient();

  const login = useMutation(usersService.login, {
    retry: false,
    onSuccess(data) {
      tokenActions.setUserToken(data.token);
      queryClient.invalidateQueries(["authMe"]);
    },
  });

  const register = useMutation(usersService.register, {
    retry: false,
    onSuccess(data) {
      tokenActions.setUserToken(data.token);
      queryClient.invalidateQueries(["authMe"]);
    },
  });

  return {
    login,
    register,
  };
};

export default useUsersAuth;
