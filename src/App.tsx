import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import AdminLayout from "./components/admin/AdminLayout";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { ProductsProvider } from "./context/ProductsContext";
import Home from "./pages/client/Home";
import Menu from "./pages/client/Menu";
import Cart from "./pages/client/Cart";
import Checkout from "./pages/client/Checkout";
import OrderConfirmation from "./pages/client/OrderConfirmation";
import OrderTracking from "./pages/client/OrderTracking";
import About from "./pages/client/About";
import FAQ from "./pages/client/FAQ";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import ProductForm from "./pages/admin/ProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import PagePlaceholder from "./components/ui/PagePlaceholder";

function NotFound() {
  return (
    <PagePlaceholder
      title="404"
      description="La página que buscas no existe o fue movida."
    />
  );
}

export default function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <OrderProvider>
          <BrowserRouter>
            <Routes>
              {/* ─── Cliente (con layout público) ─── */}
              <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmacion" element={<OrderConfirmation />} />
                <Route path="/rastrear" element={<OrderTracking />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/faq" element={<FAQ />} />

                <Route path="*" element={<NotFound />} />
              </Route>

              {/* ─── Admin (con layout propio) ─── */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="productos" element={<AdminProducts />} />
                <Route path="productos/nuevo" element={<ProductForm />} />
                <Route path="productos/:id" element={<ProductForm />} />
                <Route path="pedidos" element={<AdminOrders />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </OrderProvider>
      </CartProvider>
    </ProductsProvider>
  );
}
