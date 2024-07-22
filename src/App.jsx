import React from "react";
import Navbar from "./Layouts/Navbar";
import "./App.css";
import { Route, Routes, useLocation, Router } from "react-router-dom";
import HomePages from "./Pages/HomePages";
import Footer from "./Layouts/Footer";
import DetailPages from "./Pages/DetailPages";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ListPages from "./Pages/ListPages";
import NotFoundPages from "./Pages/NotFoundPages";
import ProfilePages from "./Pages/ProfilePages";
import AdminPages from "./Pages/AdminPages";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AdminRoute from "./Provider/AdminRoute";
import ProfileProvider from "./Provider/ProfileProvider";
import UserReports from "./Components/UserReports";
import AboutPages from "./Pages/AboutPages";

function App() {
  const location = useLocation();

  // const isAdminPage = location.pathname.startsWith("/admin");
  // const isRegisterPage = location.pathname.startsWith("/daftar");
  const isLoginPage = location.pathname.startsWith("/masuk");
  const isRegisterPage = location.pathname.startsWith("/daftar");
  return (
    <Provider store={store}>
      <div
        className={`flex flex-col ${
          isLoginPage ? "min-h-screen" : ""
        } min-h-screen`}
      >
        {isLoginPage || isRegisterPage ? null : <Navbar />}
        {/* <Navbar /> */}

        <main className="min-h-3.5">
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/listreport" element={<ListPages />} />
            <Route path="/laporan/detail/:id" element={<DetailPages />} />
            <Route path="/about" element={<AboutPages />} />

            <Route path="/masuk" element={<LoginPage />} />
            <Route path="/daftar" element={<RegisterPage />} />
            <Route element={<ProfileProvider />}>
              <Route path="/profile/*" element={<ProfilePages />} />
              <Route path="/laporan/laporan-user" element={<UserReports />} />
            </Route>

            <Route path="*" element={<NotFoundPages />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin/*" element={<AdminPages />} />
            </Route>
          </Routes>
        </main>
        {/* <Footer /> */}
        {isLoginPage || isRegisterPage ? null : <Footer />}
      </div>
    </Provider>
  );
}

export default App;
