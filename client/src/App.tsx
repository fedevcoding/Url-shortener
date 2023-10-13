import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@pages";
import Redirect from "@pages/Redirect";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:url",
      element: <Redirect />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
