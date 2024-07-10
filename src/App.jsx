import Layout from "./layouts/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      // <Route element={<ProtectedRoute />}>
      <Route to="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/errorpage" />} />
      </Route>
      // </Route>
    )
  );

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
