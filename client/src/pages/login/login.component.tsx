import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { loginFields } from "./constants";
import { APP_ROUTES, AuthFormDataType, useUsersAuth } from "../../shared";

const LoginPage = () => {
  const { register, handleSubmit } = useForm<AuthFormDataType>();
  const navigate = useNavigate();
  const { login } = useUsersAuth();

  const onSubmit = handleSubmit((value: AuthFormDataType) => {
    try {
      login.mutate({ ...value });
      navigate(APP_ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form onSubmit={onSubmit} className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-lg text-white text-center">Login</h1>

      {loginFields.map(({ label, placeholder, registerName, type }) => {
        return (
          <label className="text-xs text-gray-400" key={registerName}>
            {label}:
            <input
              type={type}
              {...register(registerName)}
              placeholder={placeholder}
              className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
              autoComplete="off"
            />
          </label>
        );
      })}

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4"
        >
          Submit
        </button>
        <Link
          to={APP_ROUTES.register}
          className="flex justify-center items-center text-xs text-white"
        >
          Don't you have an account?
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
