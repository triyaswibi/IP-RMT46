import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App.jsx";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: () => {
          return redirect("/vechile");
        },
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    loader: () => {
      return redirect("/login");
    },
  },
]);

export default router;
