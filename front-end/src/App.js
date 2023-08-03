import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/user/Home";
import UserLayout from "layouts/UserLayout";
import MenuPage from "pages/user/Menu";
import ProductsList from "pages/user/ProductsList";
import ProductDetailPage from "pages/user/ProductDetail";
import LoginPage from "pages/login/LoginPage";
import RegisterPage from "pages/register/RegisterPage";
import { UserContextProvider } from "UserContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/productsList/:id" element={<ProductsList />} />
            <Route path="/productDetail/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
