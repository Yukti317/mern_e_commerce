import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authlayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import Adminlayout from "./components/admin_view/adminlayout";
import AdminDashboard from "./pages/admin_view/dashboard";
import AdminProduc from "./pages/admin_view/product";
import AdminProduct from "./pages/admin_view/product";

import AdminFeature from "./pages/admin_view/feature";
import AdminShoppinglayout from "./components/shopping_view/shoppinglayout";
import NotFoun from "./pages/notfound";
import NotFound from "./pages/notfound";
import ShoppingAccount from "./pages/shopping_view/account";
import Checkoutpage from "./pages/shopping_view/checkoutpage";
import ProductListing from "./pages/shopping_view/listing";
import Home from "./pages/shopping_view/home";
import NotAuthrozied from "./pages/notauthorize";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { check_auth } from "./store/auth_slice";
import CheckAuth from "./components/common/check_auth";
import { Skeleton } from "./components/ui/skeleton";
import AdminOrderHistory from "./components/admin_view/orders";
import PaypalReturn from "./pages/shopping_view/paypalreturn";
import Paymentsuccess from "./pages/shopping_view/paymentsuccess";
import SearchProducts from "./components/shopping_view/searchProducts";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(check_auth());
  }, []);
if(isLoading) return  <Skeleton className="w-[600px] h-[600px]"/>
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
      
        <Routes>
        <Route path="/" element ={
          <CheckAuth IsAuthenticated={isAuthenticated} user={user}></CheckAuth>
        }/>
          {/* Authentication routes */}
          <Route
            path="/auth"
            element={
              <CheckAuth IsAuthenticated={isAuthenticated} user={user}>
                <Authlayout />
              </CheckAuth>
            }
          >
            <Route path="register" element={<AuthRegister />} />
            <Route path="login" element={<AuthLogin />} />
          </Route>
          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <CheckAuth IsAuthenticated={isAuthenticated} user={user}>
                <Adminlayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="orders" element={<AdminOrderHistory />} />
            <Route path="feature" element={<AdminFeature />} />
          </Route>

          {/* Shopping routes */}
          <Route
            path="/shop"
            element={
              <CheckAuth IsAuthenticated={isAuthenticated} user={user}>
                <AdminShoppinglayout />
              </CheckAuth>
            }
          >
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="checkout" element={<Checkoutpage />} />
            <Route path="productslisting" element={<ProductListing />} />
            <Route path="home" element={<Home />} />
            <Route path="search" element={<SearchProducts/>} />
            <Route path="paypalReturn/:payerId/:paymentId" element={<PaypalReturn/>}/>
            <Route path="paymentsuccess" element={<Paymentsuccess/>}/>
          </Route>

          {/* Not Found route */}
          <Route path="*" element={<NotFound />} />
          <Route path="/notauthraized" element={<NotAuthrozied />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
