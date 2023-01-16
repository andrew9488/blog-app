import { useQuery } from "react-query";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { APP_ROUTES, tokenActions, usersService } from "../../shared";

const links = [
  { name: "Home", path: APP_ROUTES.home },
  { name: "My posts", path: APP_ROUTES.posts },
  { name: "Add post", path: APP_ROUTES.createPost },
];

const Navbar = () => {
  const { data } = useQuery(["authMe"], usersService.authMe, {
    retry: false,
  });
  const navigate = useNavigate();

  const logoutHandler = () => {
    tokenActions.removeUserToken();
    navigate(APP_ROUTES.login);
  };

  return (
    <nav className="flex py-4 justify-between items-center">
      <ul className="flex gap-8">
        {links.map(({ name, path }) => {
          return (
            <li key={path}>
              <NavLink
                to={path}
                className="text-xs text-gray-400 hover:text-white"
              >
                {name}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {data?.token ? (
          <button onClick={logoutHandler}>Log out</button>
        ) : (
          <Link to={APP_ROUTES.login}>Log in</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
