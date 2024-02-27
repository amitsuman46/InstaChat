import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    }]
  );

  return (
    <div className="font-bold">
       <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
