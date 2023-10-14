import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@pages";
import Redirect from "@pages/Redirect";
import { Header } from "@components";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/stats",
      element: (
        <section>
          <Header /> <h1>Coming Soon</h1>
        </section>
      ),
    },
    {
      path: "/:url",
      element: <Redirect />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
