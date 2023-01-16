import { useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { APP_ROUTES, usersService } from "./shared";
import { PrivateRoute } from "./components";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { PostsPage } from "./pages/posts";
import { RegisterPage } from "./pages/register";
import { CreatePostPage } from "./pages/create-post";

const App = () => {
  const { data, isLoading } = useQuery(["authMe"], usersService.authMe, {
    retry: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.token) {
      navigate(APP_ROUTES.home);
    }
  }, [data?.token]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="container mx-auto">
      <Outlet />
      <Routes>
        <Route path={APP_ROUTES.login} element={<LoginPage />} />
        <Route path={APP_ROUTES.register} element={<RegisterPage />} />
        <Route
          path={`${APP_ROUTES.home}*`}
          element={
            <PrivateRoute token={data?.token}>
              <Routes>
                <Route path={`${APP_ROUTES.home}/*`} element={<HomePage />} />
                <Route path={`${APP_ROUTES.posts}/*`} element={<PostsPage />} />
                <Route
                  path={`${APP_ROUTES.createPost}/*`}
                  element={<CreatePostPage />}
                />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
