import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/user/Home";
import UserLayout from "layouts/UserLayout";
import MenuPage from "pages/user/Menu";
import ProductsList from "pages/user/ProductsList";
import ProductDetailPage from "pages/user/ProductDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/productsList/:id" element={<ProductsList />} />
          <Route path="/productDetail/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
