import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Stats, Redirect } from "@pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/stats",
      element: <Stats />,
    },
    {
      path: "/:url",
      element: <Redirect />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
