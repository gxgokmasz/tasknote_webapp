import { createBrowserRouter } from "react-router-dom";

import { AuthenticationLayout } from "../layouts/AuthenticationLayout";
import { MainLayout } from "../layouts/MainLayout";
import { DataLoadingMiddleware } from "../middlewares/DataLoadingMiddleware";
import { AuthenticationMiddleware } from "../modules/authentication/middlewares/AuthenticationMiddleware";
import { LoginPage } from "../modules/authentication/pages/LoginPage";
import { RegisterPage } from "../modules/authentication/pages/RegisterPage";
import { NotesPage } from "../modules/notes/pages/NotesPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: (
          <AuthenticationMiddleware>
            <DataLoadingMiddleware>
              <MainLayout />
            </DataLoadingMiddleware>
          </AuthenticationMiddleware>
        ),
        children: [
          {
            index: true,
            element: <NotesPage />,
          },
        ],
      },
      {
        path: "/",
        element: (
          <AuthenticationMiddleware>
            <AuthenticationLayout />
          </AuthenticationMiddleware>
        ),
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
