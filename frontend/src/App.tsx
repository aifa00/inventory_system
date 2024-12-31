import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import { useEffect } from "react";
import axios from "./config/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "./redux/sidebarSlice";
import { RootState } from "./redux/store";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import { setUser } from "./redux/userSlice";
function App() {
  const isUser = useSelector((state: RootState) => state.user.isUser);
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/auth-status");
        dispatch(setUser(data.user));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  const handleCloseSidebar = () => {
    isSidebarOpen && dispatch(closeSidebar());
  };
  return (
    <div onClick={handleCloseSidebar}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isUser ? <Navigate to="/items" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={isUser ? <InventoryPage /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isUser ? <InventoryPage /> : <SignupPage />}
          />
          <Route
            path="/items"
            element={isUser ? <InventoryPage /> : <LoginPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
