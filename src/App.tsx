import "react-toastify/dist/ReactToastify.css";

import { RouterProvider } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import { router } from "./router";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/themes";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        position="top-center"
        draggable
        closeOnClick
        transition={Flip}
      />

      <GlobalStyle />
    </ThemeProvider>
  );
};
