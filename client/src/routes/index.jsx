import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login";
import Register from "../pages/Register.jsx";
import VechilePageList from "../pages/VechilePage.jsx";
import VechileDetailPage from "../pages/VechileDetail.jsx";
import VechileCreateForm from "../pages/CreateVechile.jsx";
import UploadImage from "../pages/UploadImage.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      return localStorage.getItem("token") ? redirect("/") : null
    },
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: () => {
          return !localStorage.getItem("token") ? redirect("/login") : null
        },
      },
      {
        path: "/vechile",
        element: <VechilePageList />,
      },
      {
        path: "/vechile/create",
        element: <VechileCreateForm />,
      },
      {
        path: "/vechile/:vechileId",
        element: <VechileDetailPage />,
      },
      {
        path: "/vechile/imgUrl/:vechileId",
        element: <UploadImage />,
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
