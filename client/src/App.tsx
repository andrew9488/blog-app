import { useQuery } from "react-query";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import { PrivateRoute } from "./components";
import { CreatePostPage } from "./pages/create-post";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { PostPage } from "./pages/post";
import { MyPostsPage } from "./pages/my-posts";
import { RegisterPage } from "./pages/register";
import { APP_ROUTES, usersService } from "./shared";

const App = () => {
  const location = useLocation();

  const { data, isLoading } = useQuery(["authMe"], usersService.authMe, {
    enabled:
      location.pathname !== APP_ROUTES.login &&
      location.pathname !== APP_ROUTES.register,
  });

  if (isLoading) {
    return (
      <div className="text-xl text-center text-white py-10">Loading...</div>
    );
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
            <PrivateRoute token={data?.token as string}>
              <Routes>
                <Route path={`${APP_ROUTES.home}/*`} element={<HomePage />} />
                <Route
                  path={`${APP_ROUTES.myPosts}/*`}
                  element={<MyPostsPage />}
                />
                <Route
                  path={`${APP_ROUTES.createPost}/*`}
                  element={<CreatePostPage />}
                />
                <Route
                  path={`${APP_ROUTES.post}/*`}
                  element={<PostPage userId={data?.user.id as number} />}
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
