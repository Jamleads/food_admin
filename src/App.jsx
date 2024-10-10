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
import Order from "./pages/Order";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Customer from "./pages/Customer";
import Admin from "./pages/Admin";
import OrderInfo from "./components/OrderInfo";
import Rewards from "./pages/Rewards";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<ProtectedRoute />}>
        <Route to="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/order/:id" element={<OrderInfo />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/admins" element={<Admin />} />
          <Route path="*" element={<Navigate to="/errorpage" />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
